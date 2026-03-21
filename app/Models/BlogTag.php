<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogTag extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    // ── Relationships ─────────────────────────────────────────────────────────

    public function posts(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(BlogPost::class, 'blog_post_tag');
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopePopular($query)
    {
        return $query->withCount('posts')->orderByDesc('posts_count');
    }
}
