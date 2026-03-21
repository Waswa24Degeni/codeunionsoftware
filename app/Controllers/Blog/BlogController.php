<?php

namespace App\Controllers\Blog;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Services\BlogService;

class BlogController extends Controller
{
    public function __construct(private readonly BlogService $blogService) {}

    public function index(Request $request): Response
    {
        $posts = BlogPost::published()
            ->with(['author', 'category', 'tags'])
            ->when($request->search, fn ($q) => $q->search($request->search))
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Blog/Index', [
            'posts'      => $posts,
            'categories' => BlogCategory::withPostCount()->get(),
            'tags'       => BlogTag::popular()->take(20)->get(),
            'filters'    => $request->only(['search', 'category', 'tag']),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::published()
            ->where('slug', $slug)
            ->with(['author', 'category', 'tags'])
            ->firstOrFail();

        $post->increment('views_count');

        return Inertia::render('Blog/Show', [
            'post'         => $post,
            'relatedPosts' => $this->blogService->getRelatedPosts($post, 3),
        ]);
    }

    public function category(string $slug): Response
    {
        $category = BlogCategory::where('slug', $slug)->firstOrFail();

        $posts = BlogPost::published()
            ->inCategory($category->id)
            ->with(['author', 'tags'])
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Blog/Category', [
            'category' => $category,
            'posts'    => $posts,
        ]);
    }

    public function tag(string $slug): Response
    {
        $tag = BlogTag::where('slug', $slug)->firstOrFail();

        $posts = BlogPost::published()
            ->withTag($tag->id)
            ->with(['author', 'category'])
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Blog/Tag', [
            'tag'   => $tag,
            'posts' => $posts,
        ]);
    }
}
