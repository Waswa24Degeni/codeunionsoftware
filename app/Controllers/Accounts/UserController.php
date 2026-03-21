<?php

namespace App\Controllers\Accounts;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::with('roles')
            ->when($request->search, fn ($q) => $q->where('name', 'ilike', "%{$request->search}%")
                ->orWhere('email', 'ilike', "%{$request->search}%"))
            ->when($request->role, fn ($q) => $q->role($request->role))
            ->latest()
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Admin/Accounts/Users/Index', [
            'users'   => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Accounts/Users/Create', [
            'roles' => Role::query()->pluck('name'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'role'     => ['required', 'exists:roles,name'],
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('admin.accounts.users.index')->with('success', 'User created.');
    }

    public function show(User $user): Response
    {
        return Inertia::render('Admin/Accounts/Users/Show', [
            'user' => $user->load('roles', 'permissions'),
        ]);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Accounts/Users/Edit', [
            'user' => $user->load('roles'),
            'roles' => Role::query()->pluck('name'),
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'role'     => ['required', 'exists:roles,name'],
        ]);

        $user->update([
            'name'  => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (! empty($validated['password'])) {
            $user->update(['password' => Hash::make($validated['password'])]);
        }

        $user->syncRoles([$validated['role']]);

        return back()->with('success', 'User updated.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('admin.accounts.users.index')->with('success', 'User deleted.');
    }
}
