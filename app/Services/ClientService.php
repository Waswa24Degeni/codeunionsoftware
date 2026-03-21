<?php

namespace App\Services;

use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ClientService
{
    public function create(array $data): Client
    {
        $payload = [
            'user_id' => $data['user_id'] ?? null,
            'company_name' => $data['company_name'],
            'contact_person' => $data['contact_person'] ?? null,
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'website' => $data['website'] ?? null,
            'address' => $data['address'] ?? null,
            'city' => $data['city'] ?? null,
            'state' => $data['state'] ?? null,
            'country' => $data['country'] ?? null,
            'postal_code' => $data['postal_code'] ?? null,
            'notes' => $data['notes'] ?? null,
            'status' => $data['status'] ?? 'active',
        ];

        return Client::create($payload);
    }
}
