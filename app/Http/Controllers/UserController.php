<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    private function getUser($id)
    {
        return User::find($id);
    }

    public function getProfile()
    {
        $user = User::findOrFail(auth()->user()->getAuthIdentifier());
        $user->profile;
        return response()->json($user);
    }

    // TODO: Correct implementation of UpdateProfileRequest validation rules.

    public function updateProfile(Request $request) {

        if ($this->validateUser($request) && $user = $this->getUser($request->id)) {

            if ($user->email !== $request->email) {

                $user->fill($request->all())->save();
            }

            $user->profile->fill($request->profile)->save();

            return response()->json(['data' => 'Dados atualizados com sucesso!']);
        }
        return response()->json(['errors' => 'Usuário inválido.'], 401);
    }

    private function validateUser(Request $request) {
        if (auth()->user()->getAuthIdentifier() === $request->id) {
            return true;
        }
        return false;
    }
}
