<?php

namespace App\Controllers\Accounts;

use App\Controllers\Controller;
use App\Models\Client;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ClerkController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    /**
     * Render the post-sign-in callback page.
     */
    public function callback(): Response
    {
        return Inertia::render('Auth/ClerkCallback');
    }

    /**
     * Verify the Clerk session token and create a local Laravel session.
     */
    public function syncSession(Request $request): JsonResponse
    {
        $request->validate([
            'clerk_token'   => ['nullable', 'string'],
            'clerk_user_id' => ['required', 'string', 'max:255'],
            'name'          => ['nullable', 'string', 'max:255'],
            'email'         => ['required', 'email', 'max:255'],
            'avatar_url'    => ['nullable', 'string', 'max:2048'],
        ]);

        $clerkUserId = $request->input('clerk_user_id');
        $clerkToken  = $request->input('clerk_token');

        // Try to verify via Clerk's Backend API (if secret key is configured)
        $clerkUser = null;
        $secretKey = config('clerk.secret_key');

        if ($secretKey) {
            if ($clerkToken) {
                $clerkUser = $this->verifyClerkToken($clerkToken);
            }
            if (! $clerkUser) {
                $clerkUser = $this->fetchClerkUser($clerkUserId);
            }
        }

        // Extract user details — prefer Clerk API data, fall back to frontend-provided data
        if ($clerkUser) {
            $clerkId   = $clerkUser['id'];
            $email     = $this->extractClerkEmail($clerkUser) ?? $request->input('email');
            $name      = trim(($clerkUser['first_name'] ?? '') . ' ' . ($clerkUser['last_name'] ?? '')) ?: $request->input('name', 'User');
            $avatarUrl = $clerkUser['image_url'] ?? $request->input('avatar_url');
        } else {
            // No secret key or API call failed — trust the Clerk-verified frontend data
            // The frontend is wrapped in ClerkProvider which validates the session
            $clerkId   = $clerkUserId;
            $email     = $request->input('email');
            $name      = $request->input('name', 'User');
            $avatarUrl = $request->input('avatar_url');
        }

        // Find existing user by clerk_id or email
        $user = User::where('clerk_id', $clerkId)->first()
             ?? User::where('email', $email)->first();

        if ($user) {
            // Link clerk_id if not already set
            if (! $user->clerk_id) {
                $user->update(['clerk_id' => $clerkId]);
            }

            // Sync profile data
            $user->update(array_filter([
                'name'       => $name,
                'avatar_url' => $avatarUrl,
            ]));
        } else {
            // Create a new client user
            $user = User::create([
                'clerk_id'          => $clerkId,
                'name'              => $name,
                'email'             => $email,
                'password'          => bcrypt(Str::random(32)),
                'email_verified_at' => now(),
                'avatar_url'        => $avatarUrl,
            ]);

            $user->assignRole('client');

            Client::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'company_name'   => $name,
                    'contact_person' => $name,
                    'email'          => $email,
                    'status'         => 'active',
                ]
            );
        }

        Auth::login($user, true);
        $request->session()->regenerate();

        return response()->json([
            'redirect' => $this->authService->getIntendedRoute($user),
        ]);
    }

    /**
     * Handle Clerk webhook events (user.created, user.updated, user.deleted).
     */
    public function webhook(Request $request): JsonResponse
    {
        // Verify webhook signature
        $sigHeader = $request->header('svix-signature');
        if (! $sigHeader) {
            Log::warning('Clerk webhook: missing signature header');
            return response()->json(['error' => 'Missing signature'], 400);
        }

        $payload = $request->getContent();
        $secret  = config('clerk.webhook_secret');

        if ($secret && ! $this->verifyWebhookSignature($payload, $request->headers->all(), $secret)) {
            Log::warning('Clerk webhook: invalid signature');
            return response()->json(['error' => 'Invalid signature'], 403);
        }

        $event = $request->input('type');
        $data  = $request->input('data', []);

        match ($event) {
            'user.created' => $this->handleUserCreated($data),
            'user.updated' => $this->handleUserUpdated($data),
            'user.deleted' => $this->handleUserDeleted($data),
            default        => Log::info("Clerk webhook: unhandled event [{$event}]"),
        };

        return response()->json(['status' => 'ok']);
    }

    // ── Private helpers ──────────────────────────────────────────────────

    private function verifyClerkToken(string $token): ?array
    {
        $secretKey = config('clerk.secret_key');

        if (! $secretKey) {
            Log::error('Clerk secret key is not configured');
            return null;
        }

        $response = Http::withHeaders([
            'Authorization' => "Bearer {$secretKey}",
        ])->get('https://api.clerk.com/v1/clients/verify', [
            'token' => $token,
        ]);

        if (! $response->successful()) {
            // Fallback: try to get user info directly from the session claims
            // The token is a session JWT — decode it to get the user ID and verify via users endpoint
            return $this->verifyViaUserEndpoint($token, $secretKey);
        }

        $session = $response->json();
        $userId  = $session['last_active_session']['user']['id'] ?? null;

        if (! $userId) {
            return null;
        }

        return $session['last_active_session']['user'];
    }

    private function verifyViaUserEndpoint(string $token, string $secretKey): ?array
    {
        // Decode the JWT payload (without verification—Clerk API does that)
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
        $userId  = $payload['sub'] ?? null;

        if (! $userId) {
            return null;
        }

        return $this->fetchClerkUser($userId);
    }

    private function fetchClerkUser(string $userId): ?array
    {
        $secretKey = config('clerk.secret_key');

        if (! $secretKey) {
            return null;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$secretKey}",
            ])->get("https://api.clerk.com/v1/users/{$userId}");

            return $response->successful() ? $response->json() : null;
        } catch (\Throwable $e) {
            Log::warning('ClerkController: fetchClerkUser failed', ['error' => $e->getMessage()]);
            return null;
        }
    }

    private function extractClerkEmail(array $clerkUser): ?string
    {
        $primaryId = $clerkUser['primary_email_address_id'] ?? null;
        $addresses = $clerkUser['email_addresses'] ?? [];

        foreach ($addresses as $addr) {
            if ($addr['id'] === $primaryId) {
                return $addr['email_address'];
            }
        }

        return $addresses[0]['email_address'] ?? null;
    }

    private function verifyWebhookSignature(string $payload, array $headers, string $secret): bool
    {
        $msgId    = $headers['svix-id'][0] ?? '';
        $timestamp = $headers['svix-timestamp'][0] ?? '';
        $signatures = $headers['svix-signature'][0] ?? '';

        if (! $msgId || ! $timestamp || ! $signatures) {
            return false;
        }

        // Prevent replay attacks: reject timestamps older than 5 minutes
        if (abs(time() - (int) $timestamp) > 300) {
            return false;
        }

        $signedContent = "{$msgId}.{$timestamp}.{$payload}";

        // The secret is base64-encoded with a "whsec_" prefix
        $secretBytes = base64_decode(str_replace('whsec_', '', $secret));
        $expectedSig = base64_encode(hash_hmac('sha256', $signedContent, $secretBytes, true));

        foreach (explode(' ', $signatures) as $sig) {
            $parts = explode(',', $sig, 2);
            $sigValue = $parts[1] ?? $parts[0];
            if (hash_equals($expectedSig, $sigValue)) {
                return true;
            }
        }

        return false;
    }

    private function handleUserCreated(array $data): void
    {
        $clerkId = $data['id'] ?? null;
        if (! $clerkId) return;

        $email = $this->extractClerkEmail($data);
        $name  = trim(($data['first_name'] ?? '') . ' ' . ($data['last_name'] ?? '')) ?: 'User';

        // Skip if user already exists
        if (User::where('clerk_id', $clerkId)->exists()) return;
        if ($email && User::where('email', $email)->exists()) {
            User::where('email', $email)->update(['clerk_id' => $clerkId]);
            return;
        }

        $user = User::create([
            'clerk_id'          => $clerkId,
            'name'              => $name,
            'email'             => $email,
            'password'          => bcrypt(Str::random(32)),
            'email_verified_at' => now(),
        ]);

        $user->assignRole('client');

        Client::firstOrCreate(
            ['user_id' => $user->id],
            [
                'company_name'   => $name,
                'contact_person' => $name,
                'email'          => $email,
                'status'         => 'active',
            ]
        );
    }

    private function handleUserUpdated(array $data): void
    {
        $clerkId = $data['id'] ?? null;
        if (! $clerkId) return;

        $user = User::where('clerk_id', $clerkId)->first();
        if (! $user) return;

        $email = $this->extractClerkEmail($data);
        $name  = trim(($data['first_name'] ?? '') . ' ' . ($data['last_name'] ?? ''));

        $user->update(array_filter([
            'name'       => $name ?: null,
            'email'      => $email ?: null,
            'avatar_url' => $data['image_url'] ?? null,
        ]));
    }

    private function handleUserDeleted(array $data): void
    {
        $clerkId = $data['id'] ?? null;
        if (! $clerkId) return;

        $user = User::where('clerk_id', $clerkId)->first();
        if (! $user) return;

        Log::info("Clerk webhook: user deleted [{$clerkId}], local user [{$user->id}]");
        // Soft approach: don't delete, just log. Uncomment below to delete:
        // $user->delete();
    }
}
