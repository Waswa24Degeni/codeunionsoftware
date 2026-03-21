<?php

namespace App\Controllers\Accounts;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Controllers\Controller;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors(['email' => 'The provided credentials do not match our records.'])->onlyInput('email');
        }

        $request->session()->regenerate();

        return redirect()->to($this->authService->getIntendedRoute(Auth::user()));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function showEmailVerification(): Response
    {
        return Inertia::render('Auth/VerifyEmail');
    }

    public function verifyEmail(Request $request, int $id, string $hash): RedirectResponse
    {
        $user = \App\Models\User::findOrFail($id);

        if (! hash_equals(sha1($user->getEmailForVerification()), $hash)) {
            abort(403, 'Invalid verification link.');
        }

        $user->markEmailAsVerified();

        return redirect()->route('home')->with('success', 'Email verified successfully.');
    }

    public function resendVerification(Request $request): RedirectResponse
    {
        $request->user()->sendEmailVerificationNotification();

        return back()->with('success', 'Verification link sent.');
    }

    public function profile(Request $request): Response
    {
        return Inertia::render('Auth/Profile', ['user' => $request->user()]);
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'                 => ['required', 'string', 'max:255'],
            'email'                => ['required', 'email', 'unique:users,email,' . $request->user()->id],
            'current_password'     => ['nullable', 'current_password'],
            'password'             => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $user = $request->user();
        $user->fill(['name' => $validated['name'], 'email' => $validated['email']]);

        if (! empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back()->with('success', 'Profile updated.');
    }

    public function deleteProfile(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'current_password']]);

        $user = $request->user();
        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Account deleted.');
    }
}
