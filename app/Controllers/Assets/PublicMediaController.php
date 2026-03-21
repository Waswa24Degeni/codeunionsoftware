<?php

namespace App\Controllers\Assets;

use App\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PublicMediaController extends Controller
{
    public function show(string $path): BinaryFileResponse
    {
        $normalized = ltrim($path, '/');

        // Prevent path traversal and hidden-path probing.
        if ($normalized === '' || str_contains($normalized, '..') || str_starts_with($normalized, '.')) {
            abort(404);
        }

        if (!Storage::disk('public')->exists($normalized)) {
            if ($this->isAvatarLikePath($normalized)) {
                return response()->file(public_path('images/default-avatar.svg'), [
                    'Cache-Control' => 'public, max-age=3600',
                ]);
            }

            abort(404);
        }

        $absolutePath = Storage::disk('public')->path($normalized);

        return response()->file($absolutePath, [
            'Cache-Control' => 'public, max-age=31536000',
        ]);
    }

    private function isAvatarLikePath(string $path): bool
    {
        return str_starts_with($path, 'avatars/') || str_starts_with($path, 'team-members/');
    }
}
