<?php

namespace App\Controllers\Tickets;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Controllers\Controller;
use App\Models\Ticket;
use App\Models\User;
use App\Services\TicketService;

class TicketController extends Controller
{
    public function __construct(private readonly TicketService $ticketService) {}

    public function index(Request $request): Response
    {
        $tickets = Ticket::with(['client', 'assignee'])
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->when($request->priority, fn ($q) => $q->where('priority', $request->priority))
            ->when($request->search, fn ($q) => $q->where('subject', 'ilike', "%{$request->search}%"))
            ->latest()
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Admin/Tickets/Index', [
            'tickets' => $tickets,
            'stats'   => $this->ticketService->getStats(),
            'filters' => $request->only(['status', 'priority', 'search']),
        ]);
    }

    public function show(int $id): Response
    {
        $ticket = Ticket::with(['client', 'assignee', 'replies.user'])->findOrFail($id);

        return Inertia::render('Admin/Tickets/Show', [
            'ticket' => $ticket,
            'agents' => User::agents()->get(),
        ]);
    }

    public function edit(int $id): Response
    {
        $ticket = Ticket::findOrFail($id);

        return Inertia::render('Admin/Tickets/Edit', [
            'ticket' => $ticket,
            'agents' => User::agents()->get(),
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $ticket = Ticket::findOrFail($id);

        $validated = $request->validate([
            'status'      => ['required', 'in:open,in_progress,in-progress,waiting,resolved,closed'],
            'priority'    => ['required', 'in:low,medium,high,urgent'],
            'category'    => ['nullable', 'string', 'max:100'],
            'internal_note' => ['nullable', 'string'],
        ]);

        if (($validated['status'] ?? null) === 'in-progress') {
            $validated['status'] = 'in_progress';
        }

        $ticket->update($validated);

        return back()->with('success', 'Ticket updated.');
    }

    public function reply(Request $request, int $id): RedirectResponse
    {
        $ticket = Ticket::findOrFail($id);

        $validated = $request->validate([
            'message'     => ['required', 'string', 'max:5000'],
            'is_internal' => ['boolean'],
        ]);

        $this->ticketService->addReply($ticket, $request->user(), $validated);

        return back()->with('success', 'Reply sent.');
    }

    public function assign(Request $request, int $id): RedirectResponse
    {
        $ticket = Ticket::findOrFail($id);

        $request->validate(['assignee_id' => ['required', 'exists:users,id']]);

        $this->ticketService->assign($ticket, $request->assignee_id);

        return back()->with('success', 'Ticket assigned.');
    }

    public function close(Request $request, int $id): RedirectResponse
    {
        $ticket = Ticket::findOrFail($id);
        $this->ticketService->close($ticket, $request->user());

        return back()->with('success', 'Ticket closed.');
    }

    public function destroy(int $id): RedirectResponse
    {
        Ticket::findOrFail($id)->delete();

        return redirect()->route('admin.tickets.index')->with('success', 'Ticket deleted.');
    }
}
