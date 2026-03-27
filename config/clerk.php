<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Clerk Publishable Key
    |--------------------------------------------------------------------------
    | Your Clerk publishable key (starts with pk_test_ or pk_live_).
    */
    'publishable_key' => env('CLERK_PUBLISHABLE_KEY', ''),

    /*
    |--------------------------------------------------------------------------
    | Clerk Secret Key
    |--------------------------------------------------------------------------
    | Your Clerk secret key (starts with sk_test_ or sk_live_).
    */
    'secret_key' => env('CLERK_SECRET_KEY', ''),

    /*
    |--------------------------------------------------------------------------
    | Clerk Webhook Secret
    |--------------------------------------------------------------------------
    | Used to verify webhook signatures from Clerk (starts with whsec_).
    */
    'webhook_secret' => env('CLERK_WEBHOOK_SECRET', ''),
];
