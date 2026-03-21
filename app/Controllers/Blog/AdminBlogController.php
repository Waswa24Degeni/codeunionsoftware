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
use Illuminate\Http\RedirectResponse;

class AdminBlogController extends Controller
{
    public function __construct(private readonly BlogService $blogService) {}

    public function index(Request $request): Response
    {
        $posts = BlogPost::with(['author', 'category'])
            ->when($request->search, fn ($q) => $q->search($request->search))
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Blog/Index', [
            'posts'   => $posts,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Blog/Create', [
            'categories' => BlogCategory::all(),
            'tags'       => BlogTag::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'           => ['required', 'string', 'max:255'],
            'slug'            => ['required', 'string', 'unique:blog_posts'],
            'excerpt'         => ['nullable', 'string', 'max:500'],
            'content'         => ['required', 'string'],
            'category_id'     => ['nullable', 'exists:blog_categories,id'],
            'tags'            => ['nullable', 'array'],
            'tags.*'          => ['exists:blog_tags,id'],
            'featured_image'  => ['nullable', 'string', 'max:500'],
            'meta_title'      => ['nullable', 'string', 'max:70'],
            'meta_description'=> ['nullable', 'string', 'max:160'],
            'status'          => ['required', 'in:draft,published,scheduled'],
            'published_at'    => ['nullable', 'date'],
        ]);

        $post = $this->blogService->createPost($validated, $request->user());

        return redirect()->route('admin.blog.edit', $post)->with('success', 'Blog post created.');
    }

    public function edit(BlogPost $post): Response
    {
        return Inertia::render('Admin/Blog/Edit', [
            'post'       => $post->load('tags'),
            'categories' => BlogCategory::all(),
            'tags'       => BlogTag::all(),
        ]);
    }

    public function update(Request $request, BlogPost $post): RedirectResponse
    {
        $validated = $request->validate([
            'title'           => ['required', 'string', 'max:255'],
            'slug'            => ['required', 'string', 'unique:blog_posts,slug,' . $post->id],
            'excerpt'         => ['nullable', 'string', 'max:500'],
            'content'         => ['required', 'string'],
            'category_id'     => ['nullable', 'exists:blog_categories,id'],
            'tags'            => ['nullable', 'array'],
            'tags.*'          => ['exists:blog_tags,id'],
            'featured_image'  => ['nullable', 'string', 'max:500'],
            'status'          => ['required', 'in:draft,published'],
            'published_at'    => ['nullable', 'date'],
        ]);

        $this->blogService->updatePost($post, $validated);

        return back()->with('success', 'Blog post updated.');
    }

    public function destroy(BlogPost $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted.');
    }

    public function publish(BlogPost $post): RedirectResponse
    {
        $this->blogService->publishPost($post);

        return back()->with('success', 'Blog post published.');
    }
}
