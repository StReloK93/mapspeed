<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PointController;
use App\Services\WialonService;
use App\Http\Controllers\OrderWayController;
use App\Http\Controllers\OrderPointController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::apiResource('tracks', PointController::class)->only();
Route::post('tracks/show', [PointController::class, 'show']);
Route::post('tracks', [PointController::class, 'index']);
Route::get('generate-tracks/{id}', [PointController::class, 'generate']);
Route::get('get_tiles', [PointController::class, 'getTiles']);
Route::get('get_report', [PointController::class, 'getReport']);
Route::get('create_token', [PointController::class, 'createToken']);
Route::get('get_geozones/{data}', [PointController::class, 'getGeozones']);



Route::get('exec_report', [WialonService::class, 'getReportByTime']);


Route::post('get_way_speed', [PointController::class, 'getWaySpeed']);


Route::post('orderway/{id}/update-name', [OrderWayController::class, 'updateName']);

Route::post('greyder-jobs/analyze', [OrderPointController::class, 'greyderJobs']);

Route::apiResource('orderway', OrderWayController::class);