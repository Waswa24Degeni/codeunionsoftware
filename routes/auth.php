<?php

use Illuminate\Support\Facades\Route;
use App\Controllers\Accounts\AuthController;
use App\Controllers\Accounts\RegisterController;
use App\Controllers\Accounts\PasswordController;
use App\Controllers\Accounts\ClerkController;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {

    // Login
    Route::get('/login',  [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.attempt');

    // Register
    Route::get('/register',  [RegisterController::class, 'showRegister'])->name('register');
    Route::post('/register', [RegisterController::class, 'register'])->name('register.store');

    // Password Reset
    Route::get('/forgot-password',  [PasswordController::class, 'showForgot'])->name('password.request');
    Route::post('/forgot-password', [PasswordController::class, 'sendResetLink'])->name('password.email');
    Route::get('/reset-password/{token}',  [PasswordController::class, 'showReset'])->name('password.reset');
    Route::post('/reset-password', [PasswordController::class, 'resetPassword'])->name('password.update');

});

// ── Clerk integration ─────────────────────────────────────────────────────
Route::get('/clerk/callback', [ClerkController::class, 'callback'])->name('clerk.callback');
Route::post('/clerk/sync-session', [ClerkController::class, 'syncSession'])->name('clerk.sync');

Route::middleware('auth')->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Email Verification
    Route::get('/verify-email', [AuthController::class, 'showEmailVerification'])->name('verification.notice');
    Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('/email/verification-notification', [AuthController::class, 'resendVerification'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Profile
    Route::get('/profile',   [AuthController::class, 'profile'])->name('profile');
    Route::patch('/profile', [AuthController::class, 'updateProfile'])->name('profile.update');
    Route::delete('/profile', [AuthController::class, 'deleteProfile'])->name('profile.destroy');

});
