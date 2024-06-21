<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/{path}', function () {
    return view('app', [
        'wialon_token' => env('WIALON_TOKEN'),
        'BASE_T55_ID' => env('BASE_T55_ID'),
        'BASE_T90_ID' => env('BASE_T90_ID'),
        'BASE_KOMATSU_ID' => env('BASE_KOMATSU_ID'),
        'BASE_CAT_ID' => env('BASE_CAT_ID'),
        'BASE_ALLCARS_ID' => env('BASE_ALLCARS_ID'),
    ]);
})->where('path', '.*');