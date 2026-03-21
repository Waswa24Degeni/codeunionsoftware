<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Support\PublicMedia;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_url',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ── Relationships ─────────────────────────────────────────────────────────

    public function client(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Client::class);
    }

    public function blogPosts(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BlogPost::class, 'user_id');
    }

    public function assignedTickets(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Ticket::class, 'assignee_id');
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopeAgents($query)
    {
        return $query->role(['admin', 'support', 'super-admin']);
    }

    public function scopeActive($query)
    {
        return $query;
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public function isAdmin(): bool
    {
        return $this->hasRole(['admin', 'super-admin']);
    }

    public function isClient(): bool
    {
        return $this->hasRole('client');
    }

    public function getAvatarUrlAttribute(): string
    {
        $avatar = (string) ($this->attributes['avatar_url'] ?? '');
        $resolved = PublicMedia::resolveUrl($avatar);

        if ($resolved !== null) {
            return $resolved;
        }

        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=4c6ef2&background=dde8ff';
    }
}
