<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use OpenAI\Laravel\Facades\OpenAI;

class AIService
{
    private string $model;
    private int $maxConversationTurns = 10;

    public function __construct()
    {
        $this->model = config('services.openai.default_model', 'gpt-4o');
    }

    // ── Chat / Chatbot ────────────────────────────────────────────────────────

    public function chat(string $message, string $sessionId, ?User $user = null): array
    {
        $historyKey  = "ai_chat_{$sessionId}";
        $history     = Cache::get($historyKey, []);

        $systemPrompt = $this->loadPrompt('support_prompt.txt');

        $messages = array_merge(
            [['role' => 'system', 'content' => $systemPrompt]],
            array_slice($history, -($this->maxConversationTurns * 2)),
            [['role' => 'user', 'content' => $message]],
        );

        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => $messages,
        ]);

        $reply = $response->choices[0]->message->content;

        $history[] = ['role' => 'user',      'content' => $message];
        $history[] = ['role' => 'assistant', 'content' => $reply];

        Cache::put($historyKey, $history, now()->addHours(2));
        $this->logUsage('chat', $user?->id, strlen($message));

        return ['reply' => $reply, 'session_id' => $sessionId];
    }

    public function resetConversation(string $sessionId): void
    {
        Cache::forget("ai_chat_{$sessionId}");
    }

    // ── Quotation Assistant ───────────────────────────────────────────────────

    public function suggestQuotationItems(array $data): array
    {
        $prompt = $this->loadPrompt('quotation_prompt.txt');

        $userMessage = "Project description: {$data['project_description']}\n" .
                       "Budget range: " . ($data['budget_range'] ?? 'not specified') . "\n" .
                       "Timeline: " . ($data['timeline'] ?? 'not specified');

        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => $prompt],
                ['role' => 'user',   'content' => $userMessage],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        return json_decode($response->choices[0]->message->content, true) ?? [];
    }

    public function estimateCost(array $data): array
    {
        $services   = implode(', ', $data['services']);
        $complexity = $data['complexity'];

        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => 'You are a software project cost estimator. Return JSON with estimated_hours, estimated_cost_usd, and breakdown array.'],
                ['role' => 'user',   'content' => "Estimate cost for: {$services}. Complexity: {$complexity}."],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        return json_decode($response->choices[0]->message->content, true) ?? [];
    }

    // ── Content Generation ────────────────────────────────────────────────────

    public function generateBlogPost(array $data): array
    {
        $prompt   = $this->loadPrompt('blog_prompt.txt');
        $keywords = isset($data['keywords']) ? implode(', ', $data['keywords']) : '';
        $tone     = $data['tone'] ?? 'professional';
        $length   = $data['length'] ?? 'medium';

        $userMessage = "Topic: {$data['topic']}\nKeywords: {$keywords}\nTone: {$tone}\nLength: {$length}";

        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => $prompt],
                ['role' => 'user',   'content' => $userMessage],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        return json_decode($response->choices[0]->message->content, true) ?? [];
    }

    public function generateServicePage(array $data): array
    {
        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => 'You are a copywriter. Write compelling service page content. Return JSON with headline, subheadline, body, and cta fields.'],
                ['role' => 'user',   'content' => json_encode($data)],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        return json_decode($response->choices[0]->message->content, true) ?? [];
    }

    public function rewriteContent(string $content, string $style): string
    {
        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => "Rewrite the following content in a {$style} style. Return only the rewritten text."],
                ['role' => 'user',   'content' => $content],
            ],
        ]);

        return $response->choices[0]->message->content;
    }

    // ── SEO ───────────────────────────────────────────────────────────────────

    public function generateSeoMeta(array $data): array
    {
        $prompt = $this->loadPrompt('seo_prompt.txt');

        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => $prompt],
                ['role' => 'user',   'content' => json_encode($data)],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        return json_decode($response->choices[0]->message->content, true) ?? [];
    }

    public function suggestKeywords(string $topic, ?string $industry, int $count): array
    {
        $response = OpenAI::chat()->create([
            'model'    => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => "You are an SEO expert. Return a JSON object with a 'keywords' array of {$count} relevant keywords."],
                ['role' => 'user',   'content' => "Topic: {$topic}" . ($industry ? ", Industry: {$industry}" : '')],
            ],
            'response_format' => ['type' => 'json_object'],
        ]);

        $result = json_decode($response->choices[0]->message->content, true);

        return $result['keywords'] ?? [];
    }

    // ── Internal helpers ──────────────────────────────────────────────────────

    private function loadPrompt(string $filename): string
    {
        $path = base_path("ai/prompts/{$filename}");

        return file_exists($path) ? file_get_contents($path) : 'You are a helpful assistant.';
    }

    private function logUsage(string $action, ?int $userId, int $inputLength): void
    {
        $logPath = base_path('ai/logs/' . date('Y-m-d') . '.log');
        $entry   = json_encode([
            'ts'     => now()->toIso8601String(),
            'action' => $action,
            'user'   => $userId,
            'chars'  => $inputLength,
        ]) . PHP_EOL;

        file_put_contents($logPath, $entry, FILE_APPEND | LOCK_EX);
    }
}
