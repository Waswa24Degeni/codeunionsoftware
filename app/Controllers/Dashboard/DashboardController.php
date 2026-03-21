<?php

namespace App\Controllers\Dashboard;

use Inertia\Inertia;
use Inertia\Response;
use App\Controllers\Controller;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $dashboardService) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard/Index', [
            'stats'          => $this->dashboardService->getStats(),
            'recentTickets'  => $this->dashboardService->getRecentTickets(),
            'recentClients'  => $this->dashboardService->getRecentClients(),
            'revenueData'    => $this->dashboardService->getRevenueData(),
        ]);
    }

    public function analytics(): Response
    {
        return Inertia::render('Admin/Dashboard/Analytics', [
            'analyticsData' => $this->dashboardService->getAnalyticsData(),
        ]);
    }
}
