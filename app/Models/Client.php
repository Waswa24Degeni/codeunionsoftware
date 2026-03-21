<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Support\PublicMedia;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'company_name',
        'contact_person',
        'email',
        'phone',
        'website',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'notes',
        'status',
    ];

    // ── Relationships ─────────────────────────────────────────────────────────

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tickets(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function quotations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Quotation::class);
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public function getAvatarUrlAttribute(): string
    {
        $avatar = (string) ($this->attributes['avatar'] ?? '');
        $resolved = PublicMedia::resolveUrl($avatar);

        return $resolved
            ?? 'https://ui-avatars.com/api/?name=' . urlencode($this->company_name) . '&color=4c6ef2&background=dde8ff';
    }
}
