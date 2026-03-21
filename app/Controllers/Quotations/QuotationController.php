<?php

namespace App\Controllers\Quotations;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Controllers\Controller;
use App\Models\Quotation;
use App\Models\Client;
use App\Models\SiteSetting;
use App\Services\QuotationService;
use Barryvdh\DomPDF\Facade\Pdf;

class QuotationController extends Controller
{
    public function __construct(private readonly QuotationService $quotationService) {}

    public function index(Request $request): Response
    {
        $quotations = Quotation::with('client')
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->when($request->search, fn ($q) => $q->whereHas('client', fn ($cq) =>
                $cq->where('company_name', 'ilike', "%{$request->search}%")
            ))
            ->latest()
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Admin/Quotations/Index', [
            'quotations' => $quotations,
            'stats'      => $this->quotationService->getStats(),
            'filters'    => $request->only(['status', 'search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Quotations/Create', [
            'clients' => Client::active()->get(['id', 'company_name', 'email']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_id'   => ['required', 'exists:clients,id'],
            'title'       => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'string'],
            'items'       => ['required', 'array', 'min:1'],
            'items.*.description' => ['required', 'string'],
            'items.*.qty'         => ['required', 'numeric', 'min:0'],
            'items.*.unit_price'  => ['required', 'numeric', 'min:0'],
            'discount'    => ['nullable', 'numeric', 'min:0', 'max:100'],
            'tax_rate'    => ['nullable', 'numeric', 'min:0', 'max:100'],
            'valid_until' => ['nullable', 'date'],
            'notes'       => ['nullable', 'string'],
        ]);

        $quotation = $this->quotationService->create($validated);

        return redirect()->route('admin.quotations.show', $quotation)->with('success', 'Quotation created.');
    }

    public function show(int $id): Response
    {
        $quotation = Quotation::with(['client', 'items'])->findOrFail($id);

        return Inertia::render('Admin/Quotations/Show', ['quotation' => $quotation]);
    }

    public function edit(int $id): Response
    {
        $quotation = Quotation::with(['client', 'items'])->findOrFail($id);

        return Inertia::render('Admin/Quotations/Edit', [
            'quotation' => $quotation,
            'clients'   => Client::active()->get(['id', 'company_name', 'email']),
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $quotation = Quotation::findOrFail($id);

        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'string'],
            'items'       => ['required', 'array', 'min:1'],
            'items.*.description' => ['required', 'string'],
            'items.*.qty'         => ['required', 'numeric', 'min:0'],
            'items.*.unit_price'  => ['required', 'numeric', 'min:0'],
            'discount'    => ['nullable', 'numeric', 'min:0', 'max:100'],
            'tax_rate'    => ['nullable', 'numeric', 'min:0', 'max:100'],
            'valid_until' => ['nullable', 'date'],
            'notes'       => ['nullable', 'string'],
        ]);

        $this->quotationService->update($quotation, $validated);

        return back()->with('success', 'Quotation updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        Quotation::findOrFail($id)->delete();

        return redirect()->route('admin.quotations.index')->with('success', 'Quotation deleted.');
    }

    public function send(int $id): RedirectResponse
    {
        $quotation = Quotation::with(['client', 'items'])->findOrFail($id);
        $this->quotationService->send($quotation);

        return back()->with('success', 'Quotation sent to client.');
    }

    public function approve(int $id): RedirectResponse
    {
        $quotation = Quotation::findOrFail($id);
        $this->quotationService->approve($quotation);

        return back()->with('success', 'Quotation approved.');
    }

    public function downloadPdf(int $id)
    {
        $quotation = Quotation::with(['client', 'items'])->findOrFail($id);

        $publicSettings = SiteSetting::publicSettings();
        $companyLogo = (string) ($publicSettings['company_logo'] ?? '');

        $pdf = Pdf::loadView('pdf.quotation', [
            'quotation' => $quotation,
            'companyName' => (string) ($publicSettings['site_name'] ?? 'CodeUnion Software'),
            'companyLogoPath' => $this->resolvePdfLogoPath($companyLogo),
        ]);

        return $pdf->download("quotation-{$quotation->reference_number}.pdf");
    }

    private function resolvePdfLogoPath(string $storedLogo): ?string
    {
        $normalized = trim($storedLogo);

        if ($normalized === '') {
            $fallbackPath = public_path('images/logo.png');

            return is_file($fallbackPath) ? $fallbackPath : null;
        }

        if (str_starts_with($normalized, 'http://') || str_starts_with($normalized, 'https://') || str_starts_with($normalized, 'data:')) {
            return $normalized;
        }

        $normalized = ltrim($normalized, '/');

        if (str_starts_with($normalized, 'storage/')) {
            $normalized = substr($normalized, strlen('storage/'));
        }

        $publicDiskPath = storage_path('app/public/' . $normalized);
        if (is_file($publicDiskPath)) {
            return $publicDiskPath;
        }

        $publicPath = public_path($normalized);
        if (is_file($publicPath)) {
            return $publicPath;
        }

        $fallbackPath = public_path('images/logo.png');

        return is_file($fallbackPath) ? $fallbackPath : null;
    }
}
