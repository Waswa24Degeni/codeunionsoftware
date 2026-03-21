<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class PortfolioProject extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'thumbnail',
        'client_name',
        'live_url',
        'github_url',
        'category',
        'is_featured',
        'status',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'is_featured'  => 'boolean',
            'completed_at' => 'date',
        ];
    }

    // ── Searchable ────────────────────────────────────────────────────────────

    public function toSearchableArray(): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => strip_tags($this->content),
            'category'    => $this->category,
            'technologies'=> $this->technologies->pluck('name')->join(', '),
        ];
    }

    // ── Relationships ─────────────────────────────────────────────────────────

    public function technologies(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'portfolio_project_technology');
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query;
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public static function categories(): array
    {
        return static::active()->distinct()->pluck('category')->sort()->values()->toArray();
    }

    public static function related(self $project): \Illuminate\Database\Eloquent\Builder
    {
        return static::active()
            ->where('id', '!=', $project->id)
            ->where('category', $project->category)
            ->latest();
    }
}
