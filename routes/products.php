<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/store', [ProductController::class, 'store'])->name('store');

Route::post('/update/partial-update/{product}', [ProductController::class, 'partialUpdate'])->name('partial-update');

Route::post('/update/{product}', [ProductController::class, 'update'])->name('update');

Route::post('/delete/{product}', [ProductController::class, 'destroy'])->name('destroy');
