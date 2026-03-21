<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
        ]);

        // Create a test super admin user
        $admin = \App\Models\User::firstOrCreate(
            ['email' => 'admin@codeunion.dev'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        $admin->syncRoles('super-admin');

        // Create a test client
        $clientUser = \App\Models\User::firstOrCreate(
            ['email' => 'client@codeunion.dev'],
            [
                'name' => 'Test Client',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        $clientUser->syncRoles('client');

        Client::firstOrCreate(
            ['user_id' => $clientUser->id],
            [
                'company_name'   => 'CodeUnion Client',
                'contact_person' => $clientUser->name,
                'email'          => $clientUser->email,
                'status'         => 'active',
            ]
        );
    }
}
