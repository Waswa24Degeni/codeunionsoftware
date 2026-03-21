<?php

namespace App\Services;

use App\Models\Ticket;
use App\Models\Client;
use App\Models\Quotation;
use Illuminate\Support\Facades\Cache;

class DashboardService
{
    public function getStats(): array
    {
        return Cache::remember('dashboard_stats', 300, function () {
            return [
                'total_clients'    => Client::count(),
                'active_clients'   => Client::where('status', 'active')->count(),
                'open_tickets'     => Ticket::whereNotIn('status', ['resolved', 'closed'])->count(),
                'pending_quotes'   => Quotation::whereIn('status', ['draft', 'sent'])->count(),
                'accepted_revenue' => Quotation::where('status', 'accepted')->sum('total'),
            ];
        });
    }

    public function getRecentTickets(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return Ticket::with(['client:id,company_name', 'assignee:id,name'])
            ->latest()
            ->take($limit)
            ->get();
    }

    public function getRecentClients(int $limit = 5): \Illuminate\Database\Eloquent\Collection
    {
        return Client::latest()->take($limit)->get();
    }

    public function getRevenueData(): array
    {
        return Cache::remember('revenue_data', 3600, function () {
            return Quotation::where('status', 'accepted')
                ->selectRaw("DATE_TRUNC('month', accepted_at) as month, SUM(total) as revenue")
                ->where('accepted_at', '>=', now()->subMonths(12))
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->map(fn ($r) => [
                    'month'   => $r->month,
                    'revenue' => (float) $r->revenue,
                ])
                ->toArray();
        });
    }

    public function getAnalyticsData(): array
    {
        return [
            'revenue'  => $this->getRevenueData(),
            'tickets'  => $this->getTicketTrend(),
            'clients'  => $this->getClientGrowth(),
        ];
    }

    private function getTicketTrend(): array
    {
        return Cache::remember('ticket_trend', 3600, function () {
            return Ticket::selectRaw("DATE_TRUNC('week', created_at) as week, COUNT(*) as count")
                ->where('created_at', '>=', now()->subWeeks(12))
                ->groupBy('week')
                ->orderBy('week')
                ->get()
                ->map(fn ($r) => ['week' => $r->week, 'count' => (int) $r->count])
                ->toArray();
        });
    }

    private function getClientGrowth(): array
    {
        return Cache::remember('client_growth', 3600, function () {
            return Client::selectRaw("DATE_TRUNC('month', created_at) as month, COUNT(*) as count")
                ->where('created_at', '>=', now()->subMonths(12))
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->map(fn ($r) => ['month' => $r->month, 'count' => (int) $r->count])
                ->toArray();
        });
    }
}
