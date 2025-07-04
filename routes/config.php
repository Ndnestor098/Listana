<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShoppingListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Configuration');
})->name('index');

Route::post('/profile', [ProfileController::class, 'update'])->name('update');