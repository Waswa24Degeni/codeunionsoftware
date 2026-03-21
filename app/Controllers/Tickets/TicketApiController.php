<?php

namespace App\Controllers\Tickets;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Models\Ticket;
use App\Services\TicketService;

class TicketApiController extends Controller
{
    public function __construct(private readonly TicketService $ticketService) {}

    public function index(Request $request): JsonResponse
    {
        $tickets = Ticket::where('client_id', $request->user()->client?->id)
            ->latest()
            ->paginate(15);

        return response()->json($tickets);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'subject'  => ['required', 'string', 'max:200'],
            'message'  => ['required', 'string', 'max:5000'],
            'priority' => ['required', 'in:low,medium,high,urgent'],
        ]);

        $ticket = $this->ticketService->createFromClient($request->user()->client, $validated);

        return response()->json($ticket, 201);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $ticket = Ticket::where('client_id', $request->user()->client?->id)
            ->with('replies')
            ->findOrFail($id);

        return response()->json($ticket);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $ticket = Ticket::where('client_id', $request->user()->client?->id)->findOrFail($id);

        $validated = $request->validate([
            'status' => ['required', 'in:open,closed'],
        ]);

        $ticket->update($validated);

        return response()->json($ticket);
    }

    public function destroy(int $id): JsonResponse
    {
        Ticket::findOrFail($id)->delete();

        return response()->json(null, 204);
    }

    public function reply(Request $request, int $id): JsonResponse
    {
        $ticket = Ticket::findOrFail($id);

        $validated = $request->validate(['message' => ['required', 'string', 'max:5000']]);

        $reply = $this->ticketService->addReply($ticket, $request->user(), ['message' => $validated['message'], 'is_internal' => false]);

        return response()->json($reply, 201);
    }
}
