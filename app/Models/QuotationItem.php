<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuotationItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'quotation_id',
        'description',
        'qty',
        'unit_price',
        'subtotal',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'qty'        => 'decimal:2',
            'unit_price' => 'decimal:2',
            'subtotal'   => 'decimal:2',
        ];
    }

    public function quotation(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    protected static function booted(): void
    {
        static::saving(function (self $item) {
            $item->subtotal = $item->qty * $item->unit_price;
        });
    }
}
