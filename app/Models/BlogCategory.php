<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'color'];

    // ── Relationships ─────────────────────────────────────────────────────────

    public function posts(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BlogPost::class, 'category_id');
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopeWithPostCount($query)
    {
        return $query->withCount(['posts' => fn ($q) => $q->published()]);
    }
}
