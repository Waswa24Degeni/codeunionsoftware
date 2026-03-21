<?php

namespace App\Controllers\Blog;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Models\BlogPost;
use App\Services\BlogService;

class BlogApiController extends Controller
{
    public function __construct(private readonly BlogService $blogService) {}

    public function index(Request $request): JsonResponse
    {
        $posts = BlogPost::published()
            ->with(['author:id,name', 'category:id,name,slug', 'tags:id,name,slug'])
            ->when($request->search, fn ($q) => $q->search($request->search))
            ->when($request->category, fn ($q) => $q->inCategory($request->category))
            ->latest('published_at')
            ->paginate(15);

        return response()->json($posts);
    }

    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::published()
            ->where('slug', $slug)
            ->with(['author:id,name', 'category', 'tags'])
            ->firstOrFail();

        return response()->json($post);
    }
}
