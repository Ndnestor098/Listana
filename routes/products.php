<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/store', [ProductController::class, 'store'])->name('store');