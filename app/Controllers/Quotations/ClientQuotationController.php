<?php

namespace App\Controllers\Quotations;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use App\Models\Quotation;
use App\Services\QuotationService;

class ClientQuotationController extends Controller
{
    public function __construct(private readonly QuotationService $quotationService) {}

    public function index(Request $request): \Inertia\Response
    {
        $quotations = Quotation::where('client_id', $request->user()->client->id)
            ->latest()
            ->paginate(15);

        return Inertia::render('Client/Quotations/Index', ['quotations' => $quotations]);
    }

    public function show(Request $request, int $id): \Inertia\Response
    {
        $quotation = Quotation::where('client_id', $request->user()->client->id)
            ->with('items')
            ->findOrFail($id);

        return Inertia::render('Client/Quotations/Show', ['quotation' => $quotation]);
    }

    public function accept(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $quotation = Quotation::where('client_id', $request->user()->client->id)->findOrFail($id);
        $this->quotationService->clientAccept($quotation);

        return back()->with('success', 'Quotation accepted.');
    }

    public function decline(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $quotation = Quotation::where('client_id', $request->user()->client->id)->findOrFail($id);
        $this->quotationService->clientDecline($quotation);

        return back()->with('success', 'Quotation declined.');
    }
}
