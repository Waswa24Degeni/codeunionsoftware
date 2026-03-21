<?php

namespace App\Controllers\AI;

use Inertia\Inertia;
use Inertia\Response;
use App\Controllers\Controller;

class AdminAiToolsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/AI/Index');
    }
}
