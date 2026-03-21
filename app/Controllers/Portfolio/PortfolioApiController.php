<?php

namespace App\Controllers\Portfolio;

use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Models\PortfolioProject;

class PortfolioApiController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = PortfolioProject::active()
            ->with('technologies:id,name')
            ->latest()
            ->paginate(12);

        return response()->json($projects);
    }

    public function show(string $slug): JsonResponse
    {
        $project = PortfolioProject::active()
            ->where('slug', $slug)
            ->with('technologies')
            ->firstOrFail();

        return response()->json($project);
    }
}
