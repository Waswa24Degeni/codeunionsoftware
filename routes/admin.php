<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\Dashboard\DashboardController;
use App\Controllers\Blog\AdminBlogController;
use App\Controllers\Portfolio\AdminPortfolioController;
use App\Controllers\Clients\ClientController;
use App\Controllers\Tickets\TicketController;
use App\Controllers\Quotations\QuotationController;
use App\Controllers\Accounts\UserController;
use App\Controllers\Accounts\RoleController;
use App\Controllers\Dashboard\SettingsController;
use App\Controllers\AI\AdminAiToolsController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'role:admin|super-admin|editor|support'])
    ->group(function () {

        // Dashboard
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/analytics', [DashboardController::class, 'analytics'])->name('analytics');

        // Blog Management
        Route::prefix('blog')->name('blog.')->middleware('permission:blog.view')
            ->controller(AdminBlogController::class)->group(function () {
                Route::get('/',               'index')->name('index');
                Route::get('/create',         'create')->name('create')->middleware('permission:blog.create');
                Route::post('/',              'store')->name('store')->middleware('permission:blog.create');
                Route::get('/{post}/edit',    'edit')->name('edit')->middleware('permission:blog.edit');
                Route::put('/{post}',         'update')->name('update')->middleware('permission:blog.edit');
                Route::delete('/{post}',      'destroy')->name('destroy')->middleware('permission:blog.delete');
                Route::post('/{post}/publish','publish')->name('publish')->middleware('permission:blog.publish');
            });

        // Portfolio Management
        Route::prefix('portfolio')->name('portfolio.')->middleware('permission:portfolio.view')
            ->controller(AdminPortfolioController::class)->group(function () {
                Route::get('/',            'index')->name('index');
                Route::get('/create',      'create')->name('create')->middleware('permission:portfolio.create');
                Route::post('/',           'store')->name('store')->middleware('permission:portfolio.create');
                Route::get('/{id}/edit',   'edit')->name('edit')->middleware('permission:portfolio.edit');
                Route::put('/{id}',        'update')->name('update')->middleware('permission:portfolio.edit');
                Route::delete('/{id}',     'destroy')->name('destroy')->middleware('permission:portfolio.delete');
            });

        // Client Management
        Route::prefix('clients')->name('clients.')->middleware('permission:clients.view')
            ->controller(ClientController::class)->group(function () {
                Route::get('/',          'index')->name('index');
                Route::get('/create',    'create')->name('create')->middleware('permission:clients.create');
                Route::post('/',         'store')->name('store')->middleware('permission:clients.create');
                Route::get('/{id}',      'show')->name('show');
                Route::get('/{id}/edit', 'edit')->name('edit')->middleware('permission:clients.edit');
                Route::put('/{id}',      'update')->name('update')->middleware('permission:clients.edit');
                Route::delete('/{id}',   'destroy')->name('destroy')->middleware('permission:clients.delete');
            });

        // Tickets
        Route::prefix('tickets')->name('tickets.')->middleware('permission:tickets.view')
            ->controller(TicketController::class)->group(function () {
                Route::get('/',              'index')->name('index');
                Route::get('/{id}',          'show')->name('show');
                Route::get('/{id}/edit',     'edit')->name('edit');
                Route::put('/{id}',          'update')->name('update')->middleware('permission:tickets.edit');
                Route::post('/{id}/reply',   'reply')->name('reply');
                Route::post('/{id}/assign',  'assign')->name('assign')->middleware('permission:tickets.assign');
                Route::post('/{id}/close',   'close')->name('close')->middleware('permission:tickets.close');
                Route::delete('/{id}',       'destroy')->name('destroy')->middleware('permission:tickets.delete');
            });

        // Quotations
        Route::prefix('quotations')->name('quotations.')->middleware('permission:quotations.view')
            ->controller(QuotationController::class)->group(function () {
                Route::get('/',            'index')->name('index');
                Route::get('/create',      'create')->name('create')->middleware('permission:quotations.create');
                Route::post('/',           'store')->name('store')->middleware('permission:quotations.create');
                Route::get('/{id}',        'show')->name('show');
                Route::get('/{id}/edit',   'edit')->name('edit')->middleware('permission:quotations.edit');
                Route::put('/{id}',        'update')->name('update')->middleware('permission:quotations.edit');
                Route::delete('/{id}',     'destroy')->name('destroy')->middleware('permission:quotations.delete');
                Route::post('/{id}/send',  'send')->name('send')->middleware('permission:quotations.send');
                Route::post('/{id}/approve','approve')->name('approve')->middleware('permission:quotations.approve');
                Route::get('/{id}/pdf',    'downloadPdf')->name('pdf');
            });

        // User Management
        Route::prefix('accounts')->name('accounts.')->middleware('permission:accounts.view')
            ->group(function () {
                Route::resource('users', UserController::class);
                Route::get('roles',         [RoleController::class, 'index'])->name('roles.index');
                Route::post('roles',        [RoleController::class, 'store'])->name('roles.store');
                Route::put('roles/{role}',  [RoleController::class, 'update'])->name('roles.update');
                Route::delete('roles/{role}',[RoleController::class, 'destroy'])->name('roles.destroy');
            });


        // Site Settings
        Route::prefix('settings')->name('settings.')
            ->group(function () {
                Route::get('/site', [SettingsController::class, 'index'])->name('index')->middleware('permission:settings.view');
                Route::post('/site/general', [SettingsController::class, 'updateGeneral'])->name('general.update')->middleware('permission:settings.edit');
                Route::post('/site/contact', [SettingsController::class, 'updateContact'])->name('contact.update')->middleware('permission:settings.edit');
                Route::post('/site/seo',     [SettingsController::class, 'updateSeo'])->name('seo.update')->middleware('permission:settings.edit');
                Route::post('/site/social',  [SettingsController::class, 'updateSocial'])->name('social.update')->middleware('permission:settings.edit');
                Route::post('/site/team',    [SettingsController::class, 'updateTeam'])->name('team.update')->middleware('permission:settings.edit');
                Route::post('/site/services',[SettingsController::class, 'updateServices'])->name('services.update')->middleware('permission:settings.edit');
            });

        // AI Tools
        Route::prefix('ai')->name('ai.')
            ->middleware('permission:ai.use')
            ->group(function () {
                Route::get('/', [AdminAiToolsController::class, 'index'])->name('index');
            });

    });
