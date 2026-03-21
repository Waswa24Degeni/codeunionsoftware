<?php

namespace App\Controllers\AI;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Services\AIService;

class SeoGeneratorController extends Controller
{
    public function __construct(private readonly AIService $aiService) {}

    public function generateMeta(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'page_title'   => ['required', 'string', 'max:200'],
            'page_content' => ['required', 'string', 'max:5000'],
            'target_keyword' => ['nullable', 'string', 'max:100'],
        ]);

        $meta = $this->aiService->generateSeoMeta($validated);

        return response()->json([
            'meta_title'       => $meta['title'],
            'meta_description' => $meta['description'],
            'og_description'   => $meta['og_description'],
        ]);
    }

    public function suggestKeywords(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'topic'    => ['required', 'string', 'max:300'],
            'industry' => ['nullable', 'string', 'max:100'],
            'count'    => ['nullable', 'integer', 'min:5', 'max:30'],
        ]);

        $keywords = $this->aiService->suggestKeywords(
            topic: $validated['topic'],
            industry: $validated['industry'] ?? null,
            count: $validated['count'] ?? 10,
        );

        return response()->json(['keywords' => $keywords]);
    }
}
