<?php

use App\Http\Controllers\ProfileController;
use App\Models\Product;
use App\Models\ShoppingList;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', function () {
    $lists = ShoppingList::with(['products', 'sharedUsers', 'owner'])
        ->where(function ($query) {
            $query->where('user_id', Auth::id())
                ->orWhereHas('sharedUsers', function ($q) {
                    $q->where('user_id', Auth::id());
                });
        })
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get(); 
    
    $lists_count = ShoppingList::where('user_id', Auth::id())
        ->orderBy('created_at', 'desc')
        ->count();

    $pending_products_count = Product::where('user_id', Auth::id())
        ->where('status', '!=', 'bought')
        ->count();

    $bought_products_count = Product::where('user_id', Auth::id())
        ->where('status', 'bought')
        ->count();

    return Inertia::render('Dashboard', compact([
        'lists',
        'lists_count',
        'bought_products_count',
        'pending_products_count',
    ]));
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

Route::get('/privacy' , function () {
    return Inertia::render('Privacy');
})->name('privacy');

require __DIR__.'/auth.php';
