<?php

namespace App\Support;

class PublicMedia
{
    public static function resolveUrl(string $rawPath): ?string
    {
        $value = trim($rawPath);
        if ($value === '') {
            return null;
        }

        if (str_starts_with($value, 'data:')) {
            return $value;
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            $path = parse_url($value, PHP_URL_PATH);
            if (!is_string($path) || $path === '') {
                return $value;
            }

            if (!self::isLocalMediaPath($path)) {
                return $value;
            }

            $value = $path;
        }

        $normalized = ltrim($value, '/');

        if (str_starts_with($normalized, 'media/')) {
            $normalized = substr($normalized, strlen('media/'));
        }

        if (str_starts_with($normalized, 'storage/')) {
            $normalized = substr($normalized, strlen('storage/'));
        }

        if ($normalized === '') {
            return null;
        }

        if (str_starts_with($normalized, 'uploads/')) {
            $publicRelative = $normalized;
        } else {
            $publicRelative = 'uploads/' . $normalized;
            self::copyFromStorageIfNeeded($normalized, $publicRelative);
        }

        if (is_file(public_path($publicRelative))) {
            return '/' . $publicRelative;
        }

        if (is_file(public_path($normalized))) {
            return '/' . $normalized;
        }

        return null;
    }

    private static function isLocalMediaPath(string $path): bool
    {
        return str_starts_with($path, '/media/')
            || str_starts_with($path, '/storage/')
            || str_starts_with($path, '/uploads/')
            || str_starts_with($path, '/avatars/')
            || str_starts_with($path, '/team-members/');
    }

    private static function copyFromStorageIfNeeded(string $storageRelativePath, string $publicRelativePath): void
    {
        $publicAbsolute = public_path($publicRelativePath);
        if (is_file($publicAbsolute)) {
            return;
        }

        $sourceAbsolute = storage_path('app/public/' . ltrim($storageRelativePath, '/'));
        if (!is_file($sourceAbsolute)) {
            return;
        }

        $directory = dirname($publicAbsolute);
        if (!is_dir($directory)) {
            @mkdir($directory, 0755, true);
        }

        @copy($sourceAbsolute, $publicAbsolute);
    }
}
