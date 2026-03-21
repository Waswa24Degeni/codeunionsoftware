<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Controllers\Blog\BlogApiController;
use App\Controllers\Portfolio\PortfolioApiController;
use App\Controllers\Tickets\TicketApiController;
use App\Controllers\Quotations\QuotationApiController;
use App\Controllers\Clients\ClientApiController;

/*
|--------------------------------------------------------------------------
| API Routes  (api/v1/*)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Unauthenticated
    Route::get('/blog',            [BlogApiController::class, 'index']);
    Route::get('/blog/{slug}',     [BlogApiController::class, 'show']);
    Route::get('/portfolio',       [PortfolioApiController::class, 'index']);
    Route::get('/portfolio/{slug}',[PortfolioApiController::class, 'show']);

    // Authenticated
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/user', fn (Request $r) => $r->user());

        // Tickets
        Route::apiResource('tickets',   TicketApiController::class);
        Route::post('tickets/{id}/reply', [TicketApiController::class, 'reply']);

        // Quotations
        Route::apiResource('quotations', QuotationApiController::class);

        // Clients
        Route::apiResource('clients',    ClientApiController::class);

    });

});
