<?php

namespace App\Controllers\Accounts;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Admin/Accounts/Roles/Index', [
            'roles'       => Role::with('permissions')->get(),
            'permissions' => Permission::all()->groupBy(fn ($p) => explode('.', $p->name)[0]),
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'unique:roles'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role = Role::create(['name' => $validated['name'], 'guard_name' => 'web']);
        $role->syncPermissions($validated['permissions'] ?? []);

        return back()->with('success', 'Role created.');
    }

    public function update(Request $request, Role $role): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role->syncPermissions($validated['permissions'] ?? []);

        return back()->with('success', 'Role permissions updated.');
    }

    public function destroy(Role $role): \Illuminate\Http\RedirectResponse
    {
        if (in_array($role->name, ['super-admin', 'admin'])) {
            return back()->withErrors(['role' => 'Cannot delete core roles.']);
        }

        $role->delete();

        return back()->with('success', 'Role deleted.');
    }
}
