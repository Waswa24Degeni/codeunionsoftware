<?php

namespace App\Services;

use App\Models\Ticket;
use App\Models\TicketReply;
use App\Models\Client;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;

class TicketService
{
    public function __construct(private readonly SystemNotificationService $notificationService) {}

    public function createFromClient(Client $client, array $data): Ticket
    {
        if (!$client->user) {
            throw new \RuntimeException('Client account is not linked to a portal user.');
        }

        $ticket = Ticket::create([
            'client_id' => $client->id,
            'subject'   => $data['subject'],
            'body'      => $data['message'],
            'priority'  => $data['priority'],
            'category'  => $data['category'] ?? null,
            'status'    => 'open',
        ]);

        $this->addReply($ticket, $client->user, [
            'message'     => $data['message'],
            'is_internal' => false,
        ]);

        $this->notificationService->notifyAdmins(
            title: "New Ticket #{$ticket->id}",
            message: sprintf('%s submitted "%s".', $client->company_name, $ticket->subject),
            url: route('admin.tickets.show', $ticket->id),
            level: 'info',
            meta: [
                'type' => 'ticket.created',
                'ticket_id' => $ticket->id,
                'priority' => $ticket->priority,
            ],
        );

        return $ticket;
    }

    public function addReply(Ticket $ticket, User $user, array $data): TicketReply
    {
        $reply = $ticket->replies()->create([
            'user_id'     => $user->id,
            'message'     => $data['message'],
            'is_internal' => $data['is_internal'] ?? false,
        ]);

        // Update ticket status if admin responded
        if ($user->isAdmin() && $ticket->status === 'open') {
            $this->updateTicketInProgress($ticket);
        }

        if ($user->isAdmin()) {
            if (!($data['is_internal'] ?? false)) {
                $this->notificationService->notifyClient(
                    client: $ticket->client,
                    title: "Ticket #{$ticket->id} Updated",
                    message: 'Support has replied to your ticket.',
                    url: route('client.tickets.show', $ticket->id),
                    level: 'info',
                    meta: [
                        'type' => 'ticket.reply.admin',
                        'ticket_id' => $ticket->id,
                    ],
                );
            }
        } else {
            $this->notificationService->notifyAdmins(
                title: "Client Reply on Ticket #{$ticket->id}",
                message: sprintf('%s replied to "%s".', $ticket->client?->company_name ?? 'Client', $ticket->subject),
                url: route('admin.tickets.show', $ticket->id),
                level: 'info',
                meta: [
                    'type' => 'ticket.reply.client',
                    'ticket_id' => $ticket->id,
                ],
            );
        }

        return $reply;
    }

    public function assign(Ticket $ticket, int $assigneeId): Ticket
    {
        try {
            $ticket->update([
                'assignee_id' => $assigneeId,
                'status'      => 'in_progress',
            ]);
        } catch (QueryException $exception) {
            // Backward compatibility for DBs still enforcing legacy in-progress value.
            if (str_contains($exception->getMessage(), 'tickets_status_check')) {
                $ticket->update([
                    'assignee_id' => $assigneeId,
                    'status'      => 'in-progress',
                ]);
            } else {
                throw $exception;
            }
        }

        $assignee = User::find($assigneeId);

        if ($assignee) {
            $this->notificationService->notifyUsers(
                users: [$assignee],
                title: "Ticket #{$ticket->id} Assigned",
                message: sprintf('You were assigned "%s".', $ticket->subject),
                url: route('admin.tickets.show', $ticket->id),
                level: 'info',
                meta: [
                    'type' => 'ticket.assigned',
                    'ticket_id' => $ticket->id,
                ],
            );
        }

        $this->notificationService->notifyClient(
            client: $ticket->client,
            title: "Ticket #{$ticket->id} In Progress",
            message: 'Your ticket has been assigned to a support agent.',
            url: route('client.tickets.show', $ticket->id),
            level: 'info',
            meta: [
                'type' => 'ticket.assigned.client',
                'ticket_id' => $ticket->id,
            ],
        );

        return $ticket;
    }

    public function close(Ticket $ticket, ?User $closedBy = null): Ticket
    {
        $ticket->update([
            'status'    => 'closed',
            'closed_at' => now(),
        ]);

        if ($closedBy?->isClient()) {
            $this->notificationService->notifyAdmins(
                title: "Ticket #{$ticket->id} Closed by Client",
                message: sprintf('%s closed ticket "%s".', $ticket->client?->company_name ?? 'Client', $ticket->subject),
                url: route('admin.tickets.show', $ticket->id),
                level: 'warning',
                meta: [
                    'type' => 'ticket.closed.client',
                    'ticket_id' => $ticket->id,
                ],
            );
        } else {
            $this->notificationService->notifyClient(
                client: $ticket->client,
                title: "Ticket #{$ticket->id} Closed",
                message: 'Support marked your ticket as closed.',
                url: route('client.tickets.show', $ticket->id),
                level: 'warning',
                meta: [
                    'type' => 'ticket.closed.admin',
                    'ticket_id' => $ticket->id,
                ],
            );
        }

        return $ticket;
    }

    public function getStats(): array
    {
        return Cache::remember('ticket_stats', 300, function () {
            return [
                'total'       => Ticket::count(),
                'open'        => Ticket::where('status', 'open')->count(),
                'in_progress' => Ticket::whereIn('status', ['in_progress', 'in-progress'])->count(),
                'resolved'    => Ticket::where('status', 'resolved')->count(),
                'urgent'      => Ticket::where('priority', 'urgent')->open()->count(),
            ];
        });
    }

    private function updateTicketInProgress(Ticket $ticket): void
    {
        try {
            $ticket->update(['status' => 'in_progress']);
        } catch (QueryException $exception) {
            if (str_contains($exception->getMessage(), 'tickets_status_check')) {
                $ticket->update(['status' => 'in-progress']);
            } else {
                throw $exception;
            }
        }
    }
}
