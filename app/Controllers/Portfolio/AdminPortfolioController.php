<?php

namespace App\Controllers\Portfolio;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Controllers\Controller;
use App\Models\PortfolioProject;
use App\Models\Technology;

class AdminPortfolioController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = PortfolioProject::with('technologies')
            ->when($request->search, fn ($q) => $q->where('title', 'ilike', "%{$request->search}%"))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Portfolio/Index', [
            'projects' => $projects,
            'filters'  => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Portfolio/Create', [
            'technologies' => Technology::all(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'slug'         => ['required', 'string', 'unique:portfolio_projects'],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'content'      => ['required', 'string'],
            'thumbnail'    => ['nullable', 'string', 'max:500'],
            'client_name'  => ['nullable', 'string', 'max:100'],
            'live_url'     => ['nullable', 'url', 'max:500'],
            'github_url'   => ['nullable', 'url', 'max:500'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['exists:technologies,id'],
            'category'     => ['required', 'string', 'max:100'],
            'is_featured'  => ['boolean'],
            'status'       => ['required', 'in:draft,published'],
            'completed_at' => ['nullable', 'date'],
        ]);

        $technologyIds = $validated['technologies'] ?? [];
        unset($validated['technologies']);

        $project = PortfolioProject::create($validated);
        $project->technologies()->sync($technologyIds);

        return redirect()->route('admin.portfolio.index')->with('success', 'Project created.');
    }

    public function edit(int $id): Response
    {
        $project = PortfolioProject::with('technologies')->findOrFail($id);

        return Inertia::render('Admin/Portfolio/Edit', [
            'project' => $project,
            'technologies' => Technology::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $project = PortfolioProject::findOrFail($id);

        $validated = $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'slug'         => ['required', 'string', 'unique:portfolio_projects,slug,' . $id],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'content'      => ['required', 'string'],
            'thumbnail'    => ['nullable', 'string', 'max:500'],
            'client_name'  => ['nullable', 'string', 'max:100'],
            'live_url'     => ['nullable', 'url', 'max:500'],
            'github_url'   => ['nullable', 'url', 'max:500'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['exists:technologies,id'],
            'category'     => ['required', 'string', 'max:100'],
            'is_featured'  => ['boolean'],
            'status'       => ['required', 'in:draft,published'],
            'completed_at' => ['nullable', 'date'],
        ]);

        $technologyIds = $validated['technologies'] ?? [];
        unset($validated['technologies']);

        $project->update($validated);
        $project->technologies()->sync($technologyIds);

        return back()->with('success', 'Project updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        PortfolioProject::findOrFail($id)->delete();

        return redirect()->route('admin.portfolio.index')->with('success', 'Project deleted.');
    }
}
