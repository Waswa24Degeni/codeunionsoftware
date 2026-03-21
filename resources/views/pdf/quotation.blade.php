<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
        .logo { margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
        .logo img { max-height: 46px; width: auto; }
        .logo-text { font-size: 28px; font-weight: 700; color: #4c6ef2; }
        table { width: 100%; border-collapse: collapse; }
        .header-section { margin-bottom: 32px; }
        .section-title { font-size: 11px; text-transform: uppercase; color: #666; letter-spacing: 1px; }
        .items-table th { background: #f8f9fa; padding: 8px 12px; text-align: left; font-size: 12px; }
        .items-table td { padding: 8px 12px; border-bottom: 1px solid #eee; font-size: 13px; }
        .totals { margin-top: 24px; text-align: right; }
        .total-row { padding: 4px 0; }
        .grand-total { font-size: 18px; font-weight: 700; color: #4c6ef2; }
    </style>
</head>
<body>
    <div class="logo">
        @if (!empty($companyLogoPath))
            <img src="{{ $companyLogoPath }}" alt="{{ $companyName }} logo">
        @endif
        <div class="logo-text">{{ $companyName }}</div>
    </div>

    <div class="header-section">
        <table>
            <tr>
                <td width="50%">
                    <p class="section-title">Quotation For</p>
                    <strong>{{ $quotation->client->company_name }}</strong><br>
                    {{ $quotation->client->email }}<br>
                    {{ $quotation->client->phone }}
                </td>
                <td width="50%" style="text-align:right">
                    <h2 style="color:#4c6ef2;">QUOTATION</h2>
                    <p><strong>#{{ $quotation->reference_number }}</strong></p>
                    <p>Date: {{ now()->format('M d, Y') }}</p>
                    @if ($quotation->valid_until)
                    <p>Valid Until: {{ $quotation->valid_until->format('M d, Y') }}</p>
                    @endif
                </td>
            </tr>
        </table>
    </div>

    <h3>{{ $quotation->title }}</h3>
    @if ($quotation->description)
        <p>{{ $quotation->description }}</p>
    @endif

    <table class="items-table" style="margin-top:24px">
        <thead>
            <tr>
                <th>Description</th>
                <th style="text-align:right">Qty</th>
                <th style="text-align:right">Unit Price</th>
                <th style="text-align:right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($quotation->items as $item)
            <tr>
                <td>{{ $item->description }}</td>
                <td style="text-align:right">{{ $item->qty }}</td>
                <td style="text-align:right">${{ number_format($item->unit_price, 2) }}</td>
                <td style="text-align:right">${{ number_format($item->subtotal, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals">
        <div class="total-row">Subtotal: ${{ number_format($quotation->subtotal, 2) }}</div>
        @if ($quotation->discount > 0)
        <div class="total-row">Discount ({{ $quotation->discount }}%): -${{ number_format($quotation->subtotal * $quotation->discount / 100, 2) }}</div>
        @endif
        @if ($quotation->tax_rate > 0)
        <div class="total-row">Tax ({{ $quotation->tax_rate }}%): ${{ number_format(($quotation->subtotal * (1 - $quotation->discount/100)) * $quotation->tax_rate / 100, 2) }}</div>
        @endif
        <div class="total-row grand-total">TOTAL: ${{ number_format($quotation->total, 2) }}</div>
    </div>

    @if ($quotation->notes)
    <div style="margin-top:40px; padding:16px; background:#f8f9fa; border-radius:8px;">
        <p class="section-title">Notes</p>
        <p>{{ $quotation->notes }}</p>
    </div>
    @endif
</body>
</html>
