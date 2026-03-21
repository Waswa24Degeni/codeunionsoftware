<?php

namespace App\Controllers\Quotations;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Models\Quotation;

class QuotationApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $quotations = Quotation::where('client_id', $request->user()->client?->id)
            ->latest()->paginate(15);

        return response()->json($quotations);
    }

    public function store(Request $request): JsonResponse
    {
        abort(403, 'Quotations are created by admin only.');
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $quotation = Quotation::where('client_id', $request->user()->client?->id)
            ->with('items')->findOrFail($id);

        return response()->json($quotation);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        abort(403, 'Quotations are updated by admin only.');
    }

    public function destroy(int $id): JsonResponse
    {
        abort(403, 'Quotations are deleted by admin only.');
    }
}
