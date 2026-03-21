<?php

namespace App\Controllers\Portfolio;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use App\Models\PortfolioProject;

class PortfolioController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = PortfolioProject::active()
            ->with('technologies')
            ->when($request->category, fn ($q) => $q->inCategory($request->category))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Portfolio/Index', [
            'projects'   => $projects,
            'categories' => PortfolioProject::categories(),
            'filters'    => $request->only(['category']),
        ]);
    }

    public function show(string $slug): Response
    {
        $project = PortfolioProject::active()
            ->where('slug', $slug)
            ->with('technologies')
            ->firstOrFail();

        return Inertia::render('Portfolio/Show', [
            'project'  => $project,
            'related'  => PortfolioProject::related($project)->take(3)->get(),
        ]);
    }
}
