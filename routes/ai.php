<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\AI\ChatbotController;
use App\Controllers\AI\QuotationAssistantController;
use App\Controllers\AI\ContentGeneratorController;
use App\Controllers\AI\SeoGeneratorController;

/*
|--------------------------------------------------------------------------
| AI Routes
|--------------------------------------------------------------------------
*/

Route::prefix('ai')
    ->name('ai.')
    ->middleware(['auth', 'permission:ai.use', 'throttle:ai'])
    ->group(function () {

        // Chatbot / Support Assistant
        Route::post('/chat',   [ChatbotController::class, 'chat'])->name('chat');
        Route::post('/reset',  [ChatbotController::class, 'reset'])->name('chat.reset');

        // Quotation Assistant
        Route::post('/quotation/suggest',  [QuotationAssistantController::class, 'suggest'])->name('quotation.suggest');
        Route::post('/quotation/estimate', [QuotationAssistantController::class, 'estimate'])->name('quotation.estimate');

        // Content Generation
        Route::prefix('content')->name('content.')->group(function () {
            Route::post('/blog',    [ContentGeneratorController::class, 'generateBlogPost'])->name('blog');
            Route::post('/service', [ContentGeneratorController::class, 'generateServicePage'])->name('service');
            Route::post('/rewrite', [ContentGeneratorController::class, 'rewrite'])->name('rewrite');
        });

        // SEO Generation
        Route::prefix('seo')->name('seo.')->group(function () {
            Route::post('/meta',     [SeoGeneratorController::class, 'generateMeta'])->name('meta');
            Route::post('/keywords', [SeoGeneratorController::class, 'suggestKeywords'])->name('keywords');
        });

    });
