<?php

namespace App\Controllers\AI;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Services\AIService;

class ChatbotController extends Controller
{
    public function __construct(private readonly AIService $aiService) {}

    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message'    => ['required', 'string', 'max:2000'],
            'session_id' => ['nullable', 'string', 'max:64'],
        ]);

        $response = $this->aiService->chat(
            message: $validated['message'],
            sessionId: $validated['session_id'] ?? session()->getId(),
            user: $request->user(),
        );

        return response()->json([
            'reply'      => $response['reply'],
            'session_id' => $response['session_id'],
        ]);
    }

    public function reset(Request $request): JsonResponse
    {
        $sessionId = $request->input('session_id', session()->getId());
        $this->aiService->resetConversation($sessionId);

        return response()->json(['status' => 'reset']);
    }
}
