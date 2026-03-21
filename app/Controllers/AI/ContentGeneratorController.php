<?php

namespace App\Controllers\AI;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Services\AIService;

class ContentGeneratorController extends Controller
{
    public function __construct(private readonly AIService $aiService) {}

    public function generateBlogPost(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'topic'    => ['required', 'string', 'max:300'],
            'keywords' => ['nullable', 'array'],
            'keywords.*' => ['string', 'max:50'],
            'tone'     => ['nullable', 'in:professional,casual,technical,educational'],
            'length'   => ['nullable', 'in:short,medium,long'],
        ]);

        $content = $this->aiService->generateBlogPost($validated);

        return response()->json(['content' => $content]);
    }

    public function generateServicePage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'service_name'   => ['required', 'string', 'max:200'],
            'target_audience'=> ['nullable', 'string', 'max:200'],
            'key_benefits'   => ['nullable', 'array'],
        ]);

        $content = $this->aiService->generateServicePage($validated);

        return response()->json(['content' => $content]);
    }

    public function rewrite(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'content'   => ['required', 'string', 'max:10000'],
            'style'     => ['nullable', 'in:formal,casual,seo-optimized,concise'],
        ]);

        $rewritten = $this->aiService->rewriteContent($validated['content'], $validated['style'] ?? 'formal');

        return response()->json(['content' => $rewritten]);
    }
}
