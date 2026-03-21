<?php

namespace App\Controllers\AI;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Services\AIService;

class QuotationAssistantController extends Controller
{
    public function __construct(private readonly AIService $aiService) {}

    public function suggest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_description' => ['required', 'string', 'max:3000'],
            'budget_range'        => ['nullable', 'string', 'max:100'],
            'timeline'            => ['nullable', 'string', 'max:100'],
        ]);

        $suggestions = $this->aiService->suggestQuotationItems($validated);

        return response()->json(['suggestions' => $suggestions]);
    }

    public function estimate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'services'    => ['required', 'array', 'min:1'],
            'services.*'  => ['string'],
            'complexity'  => ['required', 'in:low,medium,high'],
        ]);

        $estimate = $this->aiService->estimateCost($validated);

        return response()->json(['estimate' => $estimate]);
    }
}
