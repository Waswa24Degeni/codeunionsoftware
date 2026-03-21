<?php

namespace App\Controllers\Clients;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Controllers\Controller;
use App\Models\Client;

class ClientApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $clients = Client::latest()->paginate(25);

        return response()->json($clients);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:200'],
            'contact_person'=> ['nullable', 'string', 'max:200'],
            'email'        => ['required', 'email', 'unique:clients'],
            'phone'        => ['nullable', 'string', 'max:30'],
            'website'      => ['nullable', 'url', 'max:500'],
            'status'       => ['required', 'in:active,inactive,lead,suspended'],
        ]);

        $client = Client::create($validated);

        return response()->json($client, 201);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json(Client::findOrFail($id));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $client = Client::findOrFail($id);
        $client->update($request->validate([
            'company_name' => ['sometimes', 'string', 'max:200'],
            'contact_person'=> ['nullable', 'string', 'max:200'],
            'email'        => ['sometimes', 'email', 'unique:clients,email,' . $id],
            'phone'        => ['nullable', 'string', 'max:30'],
            'website'      => ['nullable', 'url', 'max:500'],
            'status'       => ['sometimes', 'in:active,inactive,lead,suspended'],
        ]));

        return response()->json($client);
    }

    public function destroy(int $id): JsonResponse
    {
        Client::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
