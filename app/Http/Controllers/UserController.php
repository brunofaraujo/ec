<?php

namespace App\Http\Controllers;

use App\User;
use Auth;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();

        return response()->json(['data' => $users]);
    }

    public function update()
    {
        if ( !Auth::user() ){
            return response()->json(['error' => 'Not Authorized'], 401);
        }
    }

/*The error interceptor's status code defaults to 422, unless overriden.

response()->error($error_message, $status_code = 422)*/

}
