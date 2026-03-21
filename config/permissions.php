<?php

/*
|--------------------------------------------------------------------------
| Application Permissions Map
|--------------------------------------------------------------------------
| Permissions are managed by spatie/laravel-permission.
| Roles and permissions are seeded via database/seeders/RolePermissionSeeder.php
*/

return [

    'roles' => [
        'super-admin',
        'admin',
        'editor',
        'support',
        'client',
    ],

    'permissions' => [

        // Blog
        'blog.view',
        'blog.create',
        'blog.edit',
        'blog.delete',
        'blog.publish',

        // Portfolio
        'portfolio.view',
        'portfolio.create',
        'portfolio.edit',
        'portfolio.delete',

        // Clients
        'clients.view',
        'clients.create',
        'clients.edit',
        'clients.delete',

        // Tickets
        'tickets.view',
        'tickets.create',
        'tickets.edit',
        'tickets.delete',
        'tickets.assign',
        'tickets.close',

        // Quotations
        'quotations.view',
        'quotations.create',
        'quotations.edit',
        'quotations.delete',
        'quotations.send',
        'quotations.approve',

        // Accounts / Users
        'accounts.view',
        'accounts.create',
        'accounts.edit',
        'accounts.delete',

        // Settings
        'settings.view',
        'settings.edit',

        // AI
        'ai.use',
        'ai.manage',
    ],

    'role_permissions' => [
        'super-admin' => '*',
        'admin' => [
            'blog.*', 'portfolio.*', 'clients.*',
            'tickets.*', 'quotations.*', 'accounts.*',
            'settings.view', 'settings.edit', 'ai.*',
        ],
        'editor' => [
            'blog.*', 'portfolio.*',
        ],
        'support' => [
            'tickets.*', 'clients.view', 'quotations.view',
        ],
        'client' => [
            'tickets.create', 'tickets.view',
            'quotations.view',
        ],
    ],

];
