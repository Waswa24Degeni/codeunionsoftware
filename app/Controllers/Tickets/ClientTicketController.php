<?php

namespace App\Controllers\Tickets;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use App\Models\Ticket;
use App\Services\TicketService;

class ClientTicketController extends Controller
{
    public function __construct(private readonly TicketService $ticketService) {}

    public function index(Request $request): \Inertia\Response
    {
        $tickets = Ticket::where('client_id', $request->user()->client->id)
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Client/Tickets/Index', ['tickets' => $tickets]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Client/Tickets/Create');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'subject'     => ['required', 'string', 'max:200'],
            'message'     => ['required', 'string', 'max:5000'],
            'priority'    => ['required', 'in:low,medium,high,urgent'],
            'category'    => ['nullable', 'string', 'max:100'],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['file', 'max:10240'],
        ]);

        $ticket = $this->ticketService->createFromClient($request->user()->client, $validated);

        return redirect()->route('client.tickets.show', $ticket->id)->with('success', 'Ticket submitted.');
    }

    public function show(Request $request, int $id): \Inertia\Response
    {
        $ticket = Ticket::where('client_id', $request->user()->client->id)
            ->with('replies.user')
            ->findOrFail($id);

        return Inertia::render('Client/Tickets/Show', ['ticket' => $ticket]);
    }

    public function update(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $ticket = Ticket::where('client_id', $request->user()->client->id)->findOrFail($id);

        $validated = $request->validate([
            'subject'  => ['required', 'string', 'max:200'],
            'priority' => ['required', 'in:low,medium,high,urgent'],
            'category' => ['nullable', 'string', 'max:100'],
        ]);

        $ticket->update($validated);

        return back()->with('success', 'Ticket details updated.');
    }

    public function reply(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $ticket = Ticket::where('client_id', $request->user()->client->id)->findOrFail($id);

        $validated = $request->validate(['message' => ['required', 'string', 'max:5000']]);

        $this->ticketService->addReply($ticket, $request->user(), ['message' => $validated['message'], 'is_internal' => false]);

        return back()->with('success', 'Reply sent.');
    }

    public function close(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $ticket = Ticket::where('client_id', $request->user()->client->id)->findOrFail($id);
        $this->ticketService->close($ticket, $request->user());

        return back()->with('success', 'Ticket closed.');
    }

    public function reopen(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $ticket = Ticket::where('client_id', $request->user()->client->id)->findOrFail($id);

        $ticket->update([
            'status' => 'open',
            'closed_at' => null,
        ]);

        return back()->with('success', 'Ticket reopened. You can reply again.');
    }
}
