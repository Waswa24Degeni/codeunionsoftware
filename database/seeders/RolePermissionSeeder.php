<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin'], ['description' => 'Full system access']);
        $admin = Role::firstOrCreate(['name' => 'admin'], ['description' => 'Administrator']);
        $editor = Role::firstOrCreate(['name' => 'editor'], ['description' => 'Blog and portfolio editor']);
        $support = Role::firstOrCreate(['name' => 'support'], ['description' => 'Support agent']);
        $client = Role::firstOrCreate(['name' => 'client'], ['description' => 'Client user']);

        // Blog permissions
        Permission::firstOrCreate(['name' => 'blog.view'], ['description' => 'View blog posts']);
        Permission::firstOrCreate(['name' => 'blog.create'], ['description' => 'Create blog posts']);
        Permission::firstOrCreate(['name' => 'blog.edit'], ['description' => 'Edit blog posts']);
        Permission::firstOrCreate(['name' => 'blog.delete'], ['description' => 'Delete blog posts']);
        Permission::firstOrCreate(['name' => 'blog.publish'], ['description' => 'Publish blog posts']);

        // Portfolio permissions
        Permission::firstOrCreate(['name' => 'portfolio.view'], ['description' => 'View portfolio']);
        Permission::firstOrCreate(['name' => 'portfolio.create'], ['description' => 'Create portfolio items']);
        Permission::firstOrCreate(['name' => 'portfolio.edit'], ['description' => 'Edit portfolio items']);
        Permission::firstOrCreate(['name' => 'portfolio.delete'], ['description' => 'Delete portfolio items']);

        // Client permissions
        Permission::firstOrCreate(['name' => 'clients.view'], ['description' => 'View clients']);
        Permission::firstOrCreate(['name' => 'clients.create'], ['description' => 'Create clients']);
        Permission::firstOrCreate(['name' => 'clients.edit'], ['description' => 'Edit clients']);
        Permission::firstOrCreate(['name' => 'clients.delete'], ['description' => 'Delete clients']);

        // Ticket permissions
        Permission::firstOrCreate(['name' => 'tickets.view'], ['description' => 'View tickets']);
        Permission::firstOrCreate(['name' => 'tickets.create'], ['description' => 'Create tickets']);
        Permission::firstOrCreate(['name' => 'tickets.edit'], ['description' => 'Edit tickets']);
        Permission::firstOrCreate(['name' => 'tickets.delete'], ['description' => 'Delete tickets']);
        Permission::firstOrCreate(['name' => 'tickets.reply'], ['description' => 'Reply to tickets']);
        Permission::firstOrCreate(['name' => 'tickets.assign'], ['description' => 'Assign tickets']);
        Permission::firstOrCreate(['name' => 'tickets.close'], ['description' => 'Close tickets']);

        // Quotation permissions
        Permission::firstOrCreate(['name' => 'quotations.view'], ['description' => 'View quotations']);
        Permission::firstOrCreate(['name' => 'quotations.create'], ['description' => 'Create quotations']);
        Permission::firstOrCreate(['name' => 'quotations.edit'], ['description' => 'Edit quotations']);
        Permission::firstOrCreate(['name' => 'quotations.delete'], ['description' => 'Delete quotations']);
        Permission::firstOrCreate(['name' => 'quotations.send'], ['description' => 'Send quotations']);
        Permission::firstOrCreate(['name' => 'quotations.approve'], ['description' => 'Approve quotations']);

        // User/Role permissions
        Permission::firstOrCreate(['name' => 'accounts.view'], ['description' => 'View account management']);
        Permission::firstOrCreate(['name' => 'users.view'], ['description' => 'View users']);
        Permission::firstOrCreate(['name' => 'users.create'], ['description' => 'Create users']);
        Permission::firstOrCreate(['name' => 'users.edit'], ['description' => 'Edit users']);
        Permission::firstOrCreate(['name' => 'users.delete'], ['description' => 'Delete users']);
        Permission::firstOrCreate(['name' => 'roles.manage'], ['description' => 'Manage roles and permissions']);

        // Settings permissions
        Permission::firstOrCreate(['name' => 'settings.view'], ['description' => 'View settings']);
        Permission::firstOrCreate(['name' => 'settings.edit'], ['description' => 'Edit settings']);

        // AI permissions
        Permission::firstOrCreate(['name' => 'ai.use'], ['description' => 'Use AI features']);
        Permission::firstOrCreate(['name' => 'ai.logs'], ['description' => 'View AI logs']);

        // Assign permissions to roles
        $superAdmin->syncPermissions(Permission::all());
        
        $admin->syncPermissions([
            'blog.view', 'blog.create', 'blog.edit', 'blog.delete', 'blog.publish',
            'portfolio.view', 'portfolio.create', 'portfolio.edit', 'portfolio.delete',
            'clients.view', 'clients.create', 'clients.edit', 'clients.delete',
            'tickets.view', 'tickets.reply', 'tickets.assign', 'tickets.edit', 'tickets.close',
            'quotations.view', 'quotations.create', 'quotations.edit', 'quotations.send', 'quotations.approve',
            'accounts.view', 'users.view', 'users.create', 'users.edit', 'users.delete',
            'roles.manage', 'settings.view', 'settings.edit',
        ]);

        $editor->syncPermissions([
            'blog.view', 'blog.create', 'blog.edit', 'blog.publish',
            'portfolio.view', 'portfolio.create', 'portfolio.edit',
        ]);

        $support->syncPermissions([
            'tickets.view', 'tickets.reply', 'tickets.assign', 'tickets.edit',
            'clients.view', 'quotations.view',
        ]);

        $client->syncPermissions([
            'blog.view', 'portfolio.view',
        ]);
    }
}
