<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Ticket extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    protected $fillable = [
        'client_id',
        'assignee_id',
        'subject',
        'body',
        'status',
        'priority',
        'category',
        'internal_note',
        'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'closed_at' => 'datetime',
        ];
    }

    protected $appends = ['message'];

    // ── Searchable ────────────────────────────────────────────────────────────

    public function toSearchableArray(): array
    {
        return [
            'id'       => $this->id,
            'subject'  => $this->subject,
            'category' => $this->category,
            'client'   => $this->client?->company_name,
        ];
    }

    // ── Relationships ─────────────────────────────────────────────────────────

    public function client(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function assignee(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function replies(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TicketReply::class);
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopeOpen($query)
    {
        return $query->whereNotIn('status', ['resolved', 'closed']);
    }

    public function scopeUrgent($query)
    {
        return $query->where('priority', 'urgent');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public function isOpen(): bool
    {
        return ! in_array($this->status, ['resolved', 'closed']);
    }

    public function getPriorityColorAttribute(): string
    {
        return match($this->priority) {
            'urgent' => 'red',
            'high'   => 'orange',
            'medium' => 'yellow',
            default  => 'green',
        };
    }

    public function getMessageAttribute(): string
    {
        return (string) ($this->attributes['body'] ?? '');
    }
}
