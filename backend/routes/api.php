<?php

use App\Http\Controllers\SelectController;
use App\Http\Controllers\WriterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get("/writers", [WriterController::class, "index"]);
Route::post("/writers", [WriterController::class, "store"]);
Route::delete("/writers/{id}", [WriterController::class, "delete"]);
Route::put("/writers/{id}", [WriterController::class, "update"]);

Route::get("/selected", [SelectController::class, "index"]);
Route::post("/selected", [SelectController::class, "store"]);
Route::delete("/selected/{writer_id}", [SelectController::class, "delete"]);