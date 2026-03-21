<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key'    => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel'              => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | OpenAI
    |--------------------------------------------------------------------------
    */
    'openai' => [
        'api_key'      => env('OPENAI_API_KEY'),
        'organization' => env('OPENAI_ORGANIZATION'),
        'request_timeout' => env('OPENAI_REQUEST_TIMEOUT', 30),
        'default_model'   => env('OPENAI_DEFAULT_MODEL', 'gpt-4o'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Meilisearch
    |--------------------------------------------------------------------------
    */
    'meilisearch' => [
        'host'   => env('MEILISEARCH_HOST', 'http://localhost:7700'),
        'key'    => env('MEILISEARCH_KEY'),
        'no-batching' => env('SCOUT_NO_BATCHING', false),
    ],

    /*
    |--------------------------------------------------------------------------
    | Scout (Full-Text Search)
    |--------------------------------------------------------------------------
    */
    'scout' => [
        'driver'  => env('SCOUT_DRIVER', 'meilisearch'),
        'prefix'  => env('SCOUT_PREFIX', 'codeunion_'),
        'queue'   => env('SCOUT_QUEUE', true),
        'chunk'   => [
            'searchable'   => 500,
            'unsearchable' => 500,
        ],
    ],

];
