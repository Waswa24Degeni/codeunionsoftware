<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quotation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id',
        'reference_number',
        'title',
        'description',
        'subtotal',
        'discount',
        'tax_rate',
        'total',
        'status',
        'notes',
        'valid_until',
        'expires_at',
        'sent_at',
        'accepted_at',
        'declined_at',
    ];

    protected function casts(): array
    {
        return [
            'subtotal'    => 'decimal:2',
            'discount'    => 'decimal:2',
            'tax_rate'    => 'decimal:2',
            'total'       => 'decimal:2',
            'valid_until' => 'date',
            'expires_at'  => 'datetime',
            'sent_at'     => 'datetime',
            'accepted_at' => 'datetime',
            'declined_at' => 'datetime',
        ];
    }

    // ── Relationships ─────────────────────────────────────────────────────────

    public function client(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function items(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(QuotationItem::class);
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public static function generateReference(): string
    {
        return 'QUO-' . strtoupper(substr(uniqid(), -6)) . '-' . date('Y');
    }

    protected static function booted(): void
    {
        static::creating(function (self $quotation) {
            $quotation->reference_number ??= static::generateReference();
        });
    }
}
