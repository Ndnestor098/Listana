<?php

use App\Http\Controllers\ShoppingListController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ShoppingListController::class, 'index'])->name('index');

Route::get('/s/{uuid}', [ShoppingListController::class, 'show'])->name('show');

Route::post('/create-list', [ShoppingListController::class, 'store'])->name('store');