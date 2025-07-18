<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/store', [ProductController::class, 'store'])->name('store');

Route::post('/update/status/{product}', [ProductController::class, 'updateStatus'])->name('update-status');

Route::post('/update/{product}', [ProductController::class, 'update'])->name('update');

Route::post('/delete/{product}', [ProductController::class, 'destroy'])->name('destroy');
