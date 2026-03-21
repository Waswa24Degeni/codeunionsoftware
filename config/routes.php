<?php

/*
|--------------------------------------------------------------------------
| Custom Route Groups Reference
|--------------------------------------------------------------------------
| This file documents the logical grouping of routes across the application.
| Actual route definitions live in routes/*.php files registered in bootstrap/app.php.
|
| Groups:
|   web    -> routes/web.php    (public website, blog, portfolio)
|   auth   -> routes/auth.php   (login, register, password reset)
|   client -> routes/client.php (client portal)
|   admin  -> routes/admin.php  (dashboard, CMS, settings)
|   api    -> routes/api.php    (JSON API for SPA & mobile)
|   ai     -> routes/ai.php     (AI assistants & generators)
*/

return [
    'prefix' => [
        'admin'  => 'admin',
        'client' => 'client',
        'api'    => 'api/v1',
        'ai'     => 'ai',
    ],

    'middleware' => [
        'admin'  => ['auth', 'role:admin|super-admin'],
        'client' => ['auth', 'auth.client'],
        'api'    => ['api', 'auth:sanctum'],
        'ai'     => ['auth', 'throttle:ai'],
    ],
];
