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

    return Inertia::render('Dashboard', compact('lists'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/suggest-emails', function (Request $request) {
    $query = $request->input('q');

    $emails = User::where('email', 'like', '%' . $query . '%')
        ->where('email', '!=', Auth::user()->email) // Excluir el correo del usuario autenticado
        ->whereNotNull('email') // Asegurarse de que el correo no sea nulo
        ->where('email', '!=', '') // Asegurarse de que el correo no esté vacío
        ->limit(5)
        ->pluck('email');

    // Ocultar parte del correo
    $ocultos = $emails->map(function ($email) {
        $parts = explode('@', $email);
        $name = $parts[0];
        $domain = $parts[1];

        // Mostrar solo primeros 3 caracteres del nombre (o menos si es corto)
        $visible = substr($name, 0, 3);
        return $visible . '@...' . substr($domain, strrpos($domain, '.') + 1);
    });

    return response()->json($ocultos);
})->name('search-email');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
