<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\SignupRequest;
use App\Profile;
use App\Role;
use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['errors' => 'Credenciais inválidas. Tente novamente ou solicite uma nova senha.'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['data' => 'Desconectado com sucesso.']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function signup(SignupRequest $request)
    {
        $user = new User();
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->remember_token = str_random(10);
        $user->role()->associate(Role::find(2));
        $user->save();

        $profile = new Profile();
        $profile->nome = $request->input('fullName');
        $profile->user()->associate($user);
        $profile->save();

        return $this->login();
    }

    public function changePassword(ChangePasswordRequest $request) {
        if ($this->validateUser($request) && $user = $this->getUser($request->id)) {

            if(auth()->validate(['email' => $user->email, 'password' => $request->password])) {
                $user->password = bcrypt($request->newPassword);
                $user->save();
                return response()->json(['data' => 'Password successfully changed.']);
            }
        }
        return response()->json(['errors' => ['password' => ['An error occurred. Password not changed.']]], 422);
    }

    private function validateUser(Request $request)
    {
        if (auth()->user()->getAuthIdentifier() === $request->id) {
            return true;
        }
        return false;
    }

    private function getUser($id)
    {
        return User::find($id);
    }
}
