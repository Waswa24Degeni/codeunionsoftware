<?php

/**
 * Application bootstrap initialisation.
 * Loaded early to define global constants, register helpers,
 * and perform any environment-level setup.
 */

define('APP_START', microtime(true));
define('APP_ROOT', dirname(__DIR__));

// Ensure critical directories exist at runtime
$requiredDirectories = [
    APP_ROOT . '/storage/logs',
    APP_ROOT . '/storage/cache',
    APP_ROOT . '/storage/sessions',
    APP_ROOT . '/storage/temp',
    APP_ROOT . '/ai/logs',
    APP_ROOT . '/ai/embeddings',
];

foreach ($requiredDirectories as $dir) {
    if (! is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}
