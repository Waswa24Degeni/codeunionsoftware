<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function getIntendedRoute(User $user): string
    {
        if ($user->hasRole(['super-admin', 'admin', 'editor', 'support'])) {
            return route('admin.dashboard');
        }

        if ($user->hasRole('client') || $user->client()->exists()) {
            return route('client.dashboard');
        }

        // Fallback for seeded local admin account before role sync is applied.
        if ($user->email === 'admin@codeunion.dev') {
            return route('admin.dashboard');
        }

        return route('home');
    }
}
