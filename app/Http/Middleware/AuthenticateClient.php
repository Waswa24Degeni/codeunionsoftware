<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateClient
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::check() || ! $request->user()->hasRole('client') || ! $request->user()->client) {
            abort(403, 'This area is restricted to registered clients.');
        }

        return $next($request);
    }
}
