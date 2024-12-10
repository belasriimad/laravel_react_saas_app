<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WordController;
use App\Http\Controllers\Api\WebhookController;
use App\Http\Controllers\Api\SubscriptionController;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', function(Request $request) {
        return [
            'user' => UserResource::make($request->user()),
            'access_token' => $request->bearerToken()
        ];
    });
    Route::post('user/logout',[UserController::class,'logout']);
    //subscription routes
    Route::post('subscribe', [SubscriptionController::class,'create']);
    Route::post('cancel', [SubscriptionController::class,'cancel']);
    Route::get('decrement/user/hearts', [SubscriptionController::class,'decrementUserHearts']);
});

//words routes
Route::get('words/{searchTerm}/find',[Wordcontroller::class,"findWordByTerm"]);
Route::get('words/{character}/starts',[Wordcontroller::class,"findWordStartWith"]);
Route::get('random/word',[Wordcontroller::class,"getRandomWord"]);

//plan routes
Route::get('plans',[SubscriptionController::class,"index"]);

//user routes
Route::post('user/register',[UserController::class,'store']);
Route::post('user/login',[UserController::class,'auth']);
