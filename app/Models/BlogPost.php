<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use App\Support\PublicMedia;

class BlogPost extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'views_count',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'views_count'  => 'integer',
        ];
    }

    // ── Searchable ────────────────────────────────────────────────────────────

    public function toSearchableArray(): array
    {
        return [
            'id'       => $this->id,
            'title'    => $this->title,
            'excerpt'  => $this->excerpt,
            'content'  => strip_tags($this->content),
            'category' => $this->category?->name,
            'tags'     => $this->tags->pluck('name')->join(', '),
        ];
    }

    // ── Relationships ─────────────────────────────────────────────────────────

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function tags(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tag');
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }

    public function scopeInCategory($query, int $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeWithTag($query, int $tagId)
    {
        return $query->whereHas('tags', fn ($q) => $q->where('blog_tags.id', $tagId));
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public function getFeaturedImageUrlAttribute(): ?string
    {
        return PublicMedia::resolveUrl((string) ($this->featured_image ?? ''));
    }

    public function getReadingTimeAttribute(): int
    {
        $wordCount = str_word_count(strip_tags($this->content ?? ''));
        return (int) max(1, round($wordCount / 200));
    }

    // ── Computed ──────────────────────────────────────────────────────────────

    public function getStatusAttribute(): string
    {
        if ($this->published_at === null) return 'draft';
        if ($this->published_at->isFuture()) return 'scheduled';
        return 'published';
    }
}
