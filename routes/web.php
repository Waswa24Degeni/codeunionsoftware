<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\Website\HomeController;
use App\Controllers\Blog\BlogController;
use App\Controllers\Portfolio\PortfolioController;
use App\Controllers\Notifications\NotificationController;
use App\Controllers\Assets\PublicMediaController;

/*
|--------------------------------------------------------------------------
| Public Web Routes
|--------------------------------------------------------------------------
*/

// ── Website ──────────────────────────────────────────────────────────────
Route::get('/media/{path}', [PublicMediaController::class, 'show'])
    ->where('path', '.*')
    ->name('media.public');

Route::controller(HomeController::class)->group(function () {
    Route::get('/',          'index')->name('home');
    Route::get('/about',     'about')->name('about');
    Route::get('/services',  'services')->name('services');
    Route::get('/services/erp-odoo',                    'serviceErpOdoo')->name('services.erp-odoo');
    Route::get('/services/mobile-app-flutter',          'serviceMobileFlutter')->name('services.mobile-flutter');
    Route::get('/services/web-development',             'serviceWebDevelopment')->name('services.web-development');
    Route::get('/services/cybersecurity',               'serviceCybersecurity')->name('services.cybersecurity');
    Route::get('/services/database-management',         'serviceDatabaseManagement')->name('services.database-management');
    Route::get('/services/custom-software-development', 'serviceCustomSoftware')->name('services.custom-software');
    Route::get('/services/ui-ux-graphic-design',        'serviceUiUxGraphicDesign')->name('services.ui-ux-graphic-design');
    Route::get('/contact',   'contact')->name('contact');
    Route::get('/privacy-policy', 'privacyPolicy')->name('privacy-policy');
    Route::get('/terms-of-service', 'termsOfService')->name('terms-of-service');
    Route::post('/contact',  'sendContact')->name('contact.send');
});

// ── Blog ─────────────────────────────────────────────────────────────────
Route::prefix('blog')->name('blog.')->controller(BlogController::class)->group(function () {
    Route::get('/',              'index')->name('index');
    Route::get('/category/{slug}', 'category')->name('category');
    Route::get('/tag/{slug}',    'tag')->name('tag');
    Route::get('/{slug}',        'show')->name('show');
});

// ── Portfolio ─────────────────────────────────────────────────────────────
Route::prefix('portfolio')->name('portfolio.')->controller(PortfolioController::class)->group(function () {
    Route::get('/',         'index')->name('index');
    Route::get('/{slug}',   'show')->name('show');
});

// ── Authenticated notification center ──────────────────────────────────────
Route::middleware('auth')->prefix('notifications')->name('notifications.')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('index');
    Route::post('/read-all', [NotificationController::class, 'markAllAsRead'])->name('read-all');
    Route::post('/{id}/read', [NotificationController::class, 'markAsRead'])->name('read');
});

// ── Auth routes ───────────────────────────────────────────────────────────
require __DIR__.'/auth.php';

// ── Admin routes ──────────────────────────────────────────────────────────
require __DIR__.'/admin.php';

// ── Client portal routes ──────────────────────────────────────────────────
require __DIR__.'/client.php';

// ── AI routes ─────────────────────────────────────────────────────────────
require __DIR__.'/ai.php';
