<?php

use App\Http\Controllers\ProfileController;
use App\Models\ShoppingList;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $lists = ShoppingList::where('user_id', Auth::id())
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get();
    
    $lists_count = ShoppingList::where('user_id', Auth::id())
        ->orderBy('created_at', 'desc')
        ->count();

    return Inertia::render('Dashboard', compact(['lists', 'lists_count']));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/suggest-emails', function (Request $request) {
    $query = $request->input('q');

    $emails = User::where('email', 'like', '%' . $query . '%')
        ->where('email', '!=', Auth::user()->email)
        ->whereNotNull('email')
        ->where('email', '!=', '')
        ->limit(5)
        ->get(['id', 'email']);

    return response()->json($emails);
})->middleware(['auth'])->name('search-email');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
