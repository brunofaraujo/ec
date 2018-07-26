<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('request-pass', 'ResetPasswordController@sendEmail');
    Route::post('reset-pass', 'ResetPasswordController@process');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'subscription'
], function () {
    Route::get('modalidades', 'InscricaoController@getModalidades');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function () {
    Route::post('profile', 'UserController@getProfile');
    Route::post('update-profile', 'UserController@updateProfile');
    Route::post('me', 'UserController@me');
});