<?php

use App\Http\Controllers\ShoppingListController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ShoppingListController::class, 'index'])->name('index');

Route::get('/s/{uuid}', [ShoppingListController::class, 'show'])->name('show');

Route::post('/create-list', [ShoppingListController::class, 'store'])->name('store');

Route::post('/status/{shoppingList}', [ShoppingListController::class, 'status'])->name('status');

Route::post('/destroy/{shoppingList}', [ShoppingListController::class, 'destroy'])->name('destroy');