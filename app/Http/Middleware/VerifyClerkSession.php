<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

/**
 * Optional middleware that checks for a Clerk session token via the
 * __session cookie and logs the user into Laravel if they are not
 * already authenticated through the regular session.
 *
 * This allows Clerk-authenticated users to access protected routes
 * even if the initial sync-session call hasn't fired yet (e.g. a
 * page reload before the callback completes).
 */
class VerifyClerkSession
{
    public function handle(Request $request, Closure $next): Response
    {
        // Already authenticated via Laravel's normal session — nothing to do
        if (Auth::check()) {
            return $next($request);
        }

        $token = $request->cookie('__session') ?? $request->bearerToken();

        if (! $token) {
            return $next($request);
        }

        $clerkUser = $this->resolveClerkUser($token);

        if (! $clerkUser) {
            return $next($request);
        }

        $user = User::where('clerk_id', $clerkUser['id'])->first();

        if ($user) {
            Auth::login($user);
        }

        return $next($request);
    }

    private function resolveClerkUser(string $token): ?array
    {
        $secretKey = config('clerk.secret_key');

        if (! $secretKey) {
            return null;
        }

        // Decode JWT payload to get user ID
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
        $userId  = $payload['sub'] ?? null;

        if (! $userId) {
            return null;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$secretKey}",
            ])->get("https://api.clerk.com/v1/users/{$userId}");

            return $response->successful() ? $response->json() : null;
        } catch (\Throwable $e) {
            Log::warning('VerifyClerkSession: failed to verify token', ['error' => $e->getMessage()]);
            return null;
        }
    }
}
