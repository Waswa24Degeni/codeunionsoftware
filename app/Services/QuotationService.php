<?php

namespace App\Services;

use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Models\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class QuotationService
{
    public function __construct(private readonly SystemNotificationService $notificationService) {}

    public function create(array $data): Quotation
    {
        $quotation = Quotation::create([
            'client_id'   => $data['client_id'],
            'title'       => $data['title'],
            'description' => $data['description'] ?? null,
            'discount'    => $data['discount'] ?? 0,
            'tax_rate'    => $data['tax_rate'] ?? 0,
            'valid_until' => $data['valid_until'] ?? null,
            'expires_at'  => $data['valid_until'] ?? null,
            'notes'       => $data['notes'] ?? null,
            'status'      => 'draft',
        ]);

        $this->syncItems($quotation, $data['items']);
        $this->recalculate($quotation);

        return $quotation->fresh(['items']);
    }

    public function update(Quotation $quotation, array $data): Quotation
    {
        $quotation->update([
            'title'       => $data['title'],
            'description' => $data['description'] ?? null,
            'discount'    => $data['discount'] ?? 0,
            'tax_rate'    => $data['tax_rate'] ?? 0,
            'valid_until' => $data['valid_until'] ?? null,
            'expires_at'  => $data['valid_until'] ?? null,
            'notes'       => $data['notes'] ?? null,
        ]);

        $this->syncItems($quotation, $data['items']);
        $this->recalculate($quotation);

        return $quotation->fresh(['items']);
    }

    public function send(Quotation $quotation): void
    {
        $quotation->update([
            'status'  => 'sent',
            'sent_at' => now(),
        ]);

        $quotation->loadMissing('client.user');

        $this->notificationService->notifyClient(
            client: $quotation->client,
            title: "Quotation {$quotation->reference_number} Sent",
            message: 'A new quotation is ready for your review.',
            url: route('client.quotations.show', $quotation->id),
            level: 'info',
            meta: [
                'type' => 'quotation.sent',
                'quotation_id' => $quotation->id,
            ],
        );

        // Mail::to($quotation->client->email)->queue(new QuotationSentMail($quotation));
    }

    public function approve(Quotation $quotation): void
    {
        $quotation->update(['status' => 'approved']);

        $quotation->loadMissing('client.user');

        $this->notificationService->notifyClient(
            client: $quotation->client,
            title: "Quotation {$quotation->reference_number} Approved",
            message: 'Your quotation has been approved and is now confirmed.',
            url: route('client.quotations.show', $quotation->id),
            level: 'success',
            meta: [
                'type' => 'quotation.approved',
                'quotation_id' => $quotation->id,
            ],
        );
    }

    public function clientAccept(Quotation $quotation): void
    {
        $quotation->update([
            'status'      => 'accepted',
            'accepted_at' => now(),
        ]);

        $quotation->loadMissing('client.user');

        $this->notificationService->notifyAdmins(
            title: "Quotation {$quotation->reference_number} Accepted",
            message: sprintf('%s accepted the quotation.', $quotation->client?->company_name ?? 'Client'),
            url: route('admin.quotations.show', $quotation->id),
            level: 'success',
            meta: [
                'type' => 'quotation.accepted',
                'quotation_id' => $quotation->id,
            ],
        );
    }

    public function clientDecline(Quotation $quotation): void
    {
        $quotation->update([
            'status'      => 'declined',
            'declined_at' => now(),
        ]);

        $quotation->loadMissing('client.user');

        $this->notificationService->notifyAdmins(
            title: "Quotation {$quotation->reference_number} Declined",
            message: sprintf('%s declined the quotation.', $quotation->client?->company_name ?? 'Client'),
            url: route('admin.quotations.show', $quotation->id),
            level: 'warning',
            meta: [
                'type' => 'quotation.declined',
                'quotation_id' => $quotation->id,
            ],
        );
    }

    public function getStats(): array
    {
        return Cache::remember('quotation_stats', 300, function () {
            return [
                'total'    => Quotation::count(),
                'draft'    => Quotation::where('status', 'draft')->count(),
                'sent'     => Quotation::where('status', 'sent')->count(),
                'accepted' => Quotation::where('status', 'accepted')->count(),
                'revenue'  => Quotation::where('status', 'accepted')->sum('total'),
            ];
        });
    }

    private function syncItems(Quotation $quotation, array $items): void
    {
        $quotation->items()->delete();

        foreach ($items as $sortOrder => $item) {
            $quotation->items()->create([
                'description' => $item['description'],
                'qty'         => $item['qty'],
                'unit_price'  => $item['unit_price'],
                'sort_order'  => $sortOrder,
            ]);
        }
    }

    private function recalculate(Quotation $quotation): void
    {
        $subtotal  = $quotation->items()->sum('subtotal');
        $discount  = $subtotal * ($quotation->discount / 100);
        $taxable   = $subtotal - $discount;
        $tax       = $taxable * ($quotation->tax_rate / 100);
        $total     = $taxable + $tax;

        $quotation->update([
            'subtotal' => $subtotal,
            'total'    => $total,
        ]);
    }
}
