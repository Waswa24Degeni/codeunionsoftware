<?php

namespace App\Services;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Support\Str;

class BlogService
{
    private function normalizeFeaturedImage(?string $raw): ?string
    {
        $value = trim((string) $raw);

        if ($value === '') {
            return null;
        }

        if (preg_match('/^https?:\/\//i', $value) === 1) {
            $parts = parse_url($value);
            $host = strtolower((string) ($parts['host'] ?? ''));
            $path = (string) ($parts['path'] ?? '');

            if (str_contains($host, 'google.') && $path === '/imgres') {
                parse_str((string) ($parts['query'] ?? ''), $query);
                $imgurl = trim((string) ($query['imgurl'] ?? ''));

                if ($imgurl !== '' && preg_match('/^https?:\/\//i', $imgurl) === 1) {
                    return $imgurl;
                }
            }
        }

        return $value;
    }

    public function getLatestPosts(int $limit = 5): \Illuminate\Database\Eloquent\Collection
    {
        return BlogPost::published()
            ->with(['author:id,name', 'category:id,name,slug'])
            ->latest('published_at')
            ->take($limit)
            ->get();
    }

    public function getRelatedPosts(BlogPost $post, int $limit = 3): \Illuminate\Database\Eloquent\Collection
    {
        return BlogPost::published()
            ->where('id', '!=', $post->id)
            ->where('category_id', $post->category_id)
            ->with(['author:id,name'])
            ->inRandomOrder()
            ->take($limit)
            ->get();
    }

    public function createPost(array $data, User $author): BlogPost
    {
        $data['user_id'] = $author->id;
        $data['slug']      = $data['slug'] ?? Str::slug($data['title']);
        $tagIds = $data['tags'] ?? [];

        if (array_key_exists('featured_image', $data)) {
            $data['featured_image'] = $this->normalizeFeaturedImage($data['featured_image']);
        }

        if (($data['status'] ?? null) === 'draft') {
            $data['published_at'] = null;
        } elseif (empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        unset($data['status'], $data['meta_title'], $data['meta_description'], $data['tags']);

        $post = BlogPost::create($data);

        if (! empty($tagIds)) {
            $post->tags()->sync($tagIds);
        }

        return $post;
    }

    public function updatePost(BlogPost $post, array $data): BlogPost
    {
        $tagIds = $data['tags'] ?? null;

        if (array_key_exists('featured_image', $data)) {
            $data['featured_image'] = $this->normalizeFeaturedImage($data['featured_image']);
        }

        if (($data['status'] ?? null) === 'draft') {
            $data['published_at'] = null;
        } elseif (($data['status'] ?? null) === 'published') {
            if (empty($data['published_at'])) {
                $data['published_at'] = $post->published_at ?? now();
            }
        }

        unset($data['status'], $data['meta_title'], $data['meta_description'], $data['tags']);

        $post->update($data);

        if (is_array($tagIds)) {
            $post->tags()->sync($tagIds);
        }

        return $post->fresh();
    }

    public function publishPost(BlogPost $post): BlogPost
    {
        $post->update([
            'published_at' => now(),
        ]);

        return $post;
    }
}
