<?php

namespace App\Controllers\Accounts;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Controllers\Controller;
use App\Models\Client;
use App\Models\User;

class RegisterController extends Controller
{
    public function showRegister(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users', 'max:255'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole('client');

        Client::firstOrCreate(
            ['user_id' => $user->id],
            [
                'company_name'   => $validated['name'],
                'contact_person' => $validated['name'],
                'email'          => $validated['email'],
                'status'         => 'active',
            ]
        );

        $user->sendEmailVerificationNotification();

        auth()->login($user);

        return redirect()->route('client.dashboard')->with('success', 'Welcome to CodeUnion!');
    }
}
