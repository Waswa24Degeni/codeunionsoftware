<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\Clients\ClientPortalController;
use App\Controllers\Tickets\ClientTicketController;
use App\Controllers\Quotations\ClientQuotationController;

/*
|--------------------------------------------------------------------------
| Client Portal Routes
|--------------------------------------------------------------------------
*/

Route::prefix('client')
    ->name('client.')
    ->middleware(['auth', 'verified', 'auth.client'])
    ->group(function () {

        // Client dashboard
        Route::get('/',          [ClientPortalController::class, 'dashboard'])->name('dashboard');
        Route::get('/profile',   [ClientPortalController::class, 'profile'])->name('profile');
        Route::get('/settings',  [ClientPortalController::class, 'settings'])->name('settings');
        Route::patch('/profile', [ClientPortalController::class, 'updateProfile'])->name('profile.update');
        Route::patch('/settings',[ClientPortalController::class, 'updateProfile'])->name('settings.update');

        // Tickets
        Route::prefix('tickets')->name('tickets.')->controller(ClientTicketController::class)->group(function () {
            Route::get('/',            'index')->name('index');
            Route::get('/create',      'create')->name('create');
            Route::post('/',           'store')->name('store');
            Route::get('/{id}',        'show')->name('show');
            Route::put('/{id}',        'update')->name('update');
            Route::post('/{id}/reply', 'reply')->name('reply');
            Route::post('/{id}/close', 'close')->name('close');
            Route::post('/{id}/reopen','reopen')->name('reopen');
        });

        // Quotations (view only for clients)
        Route::prefix('quotations')->name('quotations.')->controller(ClientQuotationController::class)->group(function () {
            Route::get('/',      'index')->name('index');
            Route::get('/{id}',  'show')->name('show');
            Route::post('/{id}/accept',   'accept')->name('accept');
            Route::post('/{id}/decline',  'decline')->name('decline');
        });

    });
