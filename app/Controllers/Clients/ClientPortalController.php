<?php

namespace App\Controllers\Clients;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use App\Models\Client;
use Illuminate\Support\Facades\Storage;

class ClientPortalController extends Controller
{
    public function dashboard(Request $request): \Inertia\Response
    {
        $client = $request->user()->client()->with([
            'tickets' => fn ($q) => $q->latest()->take(5),
            'quotations' => fn ($q) => $q->latest()->take(5),
        ])->firstOrFail();

        return Inertia::render('Client/Dashboard', [
            'client' => $client,
        ]);
    }

    public function profile(Request $request): \Inertia\Response
    {
        return $this->settings($request);
    }

    public function settings(Request $request): \Inertia\Response
    {
        return Inertia::render('Client/Profile', [
            'client' => $request->user()->client,
            'user'   => $request->user(),
        ]);
    }

    public function updateProfile(Request $request): \Illuminate\Http\RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'  => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'unique:users,email,' . $user->id],
            'phone' => ['nullable', 'string', 'max:30'],
            'company_name' => ['nullable', 'string', 'max:200'],
            'contact_person' => ['nullable', 'string', 'max:200'],
            'website' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:120'],
            'state' => ['nullable', 'string', 'max:120'],
            'country' => ['nullable', 'string', 'max:120'],
            'postal_code' => ['nullable', 'string', 'max:30'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'avatar_file' => ['nullable', 'image', 'max:4096'],
            'remove_avatar' => ['nullable'],
        ]);

        $resolvedName = trim((string) ($validated['name'] ?? $user->name));
        $resolvedEmail = trim((string) ($validated['email'] ?? $user->email));

        if ($resolvedName === '') {
            $resolvedName = $user->name;
        }

        if ($resolvedEmail === '') {
            $resolvedEmail = $user->email;
        }

        if ($request->boolean('remove_avatar')) {
            $this->deleteStorageAsset((string) ($user->getRawOriginal('avatar_url') ?? ''));
            $user->avatar_url = null;
        }

        if ($request->hasFile('avatar_file')) {
            $this->deleteStorageAsset((string) ($user->getRawOriginal('avatar_url') ?? ''));
            $user->avatar_url = $request->file('avatar_file')->store('avatars', 'public');
        }

        $user->name = $resolvedName;
        $user->email = $resolvedEmail;
        $user->save();

        $client = $user->client;

        if ($client) {
            $client->update([
                'company_name'   => $validated['company_name'] ?? $client->company_name,
                'contact_person' => $validated['contact_person'] ?? $resolvedName,
                'email'          => $resolvedEmail,
                'phone'          => $validated['phone'] ?? null,
                'website'        => $validated['website'] ?? null,
                'address'        => $validated['address'] ?? null,
                'city'           => $validated['city'] ?? null,
                'state'          => $validated['state'] ?? null,
                'country'        => $validated['country'] ?? null,
                'postal_code'    => $validated['postal_code'] ?? null,
                'notes'          => $validated['notes'] ?? null,
            ]);
        } else {
            Client::create([
                'user_id'        => $user->id,
                'company_name'   => $validated['company_name'] ?? $resolvedName,
                'contact_person' => $validated['contact_person'] ?? $resolvedName,
                'email'          => $resolvedEmail,
                'phone'          => $validated['phone'] ?? null,
                'website'        => $validated['website'] ?? null,
                'address'        => $validated['address'] ?? null,
                'city'           => $validated['city'] ?? null,
                'state'          => $validated['state'] ?? null,
                'country'        => $validated['country'] ?? null,
                'postal_code'    => $validated['postal_code'] ?? null,
                'notes'          => $validated['notes'] ?? null,
                'status'         => 'active',
            ]);
        }

        return back()->with('success', 'Profile updated.');
    }

    private function deleteStorageAsset(string $storedValue): void
    {
        if ($storedValue === '') {
            return;
        }

        if (str_starts_with($storedValue, 'http://') || str_starts_with($storedValue, 'https://') || str_starts_with($storedValue, 'data:')) {
            return;
        }

        $normalized = ltrim($storedValue, '/');

        if (str_starts_with($normalized, 'storage/')) {
            $normalized = substr($normalized, strlen('storage/'));
        }

        if ($normalized !== '') {
            Storage::disk('public')->delete($normalized);
        }
    }
}
