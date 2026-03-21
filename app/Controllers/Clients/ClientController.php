<?php

namespace App\Controllers\Clients;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Controllers\Controller;
use App\Models\Client;
use App\Services\ClientService;

class ClientController extends Controller
{
    public function __construct(private readonly ClientService $clientService) {}

    public function index(Request $request): Response
    {
        $clients = Client::with('user')
            ->when($request->search, fn ($q) => $q->where('company_name', 'ilike', "%{$request->search}%")
                ->orWhere('email', 'ilike', "%{$request->search}%"))
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Admin/Clients/Index', [
            'clients' => $clients,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Clients/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:200'],
            'contact_name' => ['nullable', 'string', 'max:200'],
            'email'        => ['required', 'email', 'unique:clients'],
            'phone'        => ['nullable', 'string', 'max:30'],
            'address'      => ['nullable', 'string', 'max:500'],
            'website'      => ['nullable', 'url'],
            'notes'        => ['nullable', 'string'],
            'status'       => ['required', 'in:active,inactive,lead,suspended'],
        ]);

        $validated['contact_person'] = $validated['contact_name'] ?? null;
        unset($validated['contact_name']);

        $client = $this->clientService->create($validated);

        return redirect()->route('admin.clients.show', $client)->with('success', 'Client created.');
    }

    public function show(int $id): Response
    {
        $client = Client::with(['user', 'tickets', 'quotations'])->findOrFail($id);

        return Inertia::render('Admin/Clients/Show', ['client' => $client]);
    }

    public function edit(int $id): Response
    {
        return Inertia::render('Admin/Clients/Edit', [
            'client' => Client::findOrFail($id),
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $client = Client::findOrFail($id);

        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:200'],
            'contact_name' => ['nullable', 'string', 'max:200'],
            'email'        => ['required', 'email', 'unique:clients,email,' . $id],
            'phone'        => ['nullable', 'string', 'max:30'],
            'address'      => ['nullable', 'string', 'max:500'],
            'website'      => ['nullable', 'url'],
            'notes'        => ['nullable', 'string'],
            'status'       => ['required', 'in:active,inactive,lead,suspended'],
        ]);

        $validated['contact_person'] = $validated['contact_name'] ?? null;
        unset($validated['contact_name']);

        $client->update($validated);

        return back()->with('success', 'Client updated.');
    }

    public function destroy(int $id): RedirectResponse
    {
        Client::findOrFail($id)->delete();

        return redirect()->route('admin.clients.index')->with('success', 'Client deleted.');
    }
}
