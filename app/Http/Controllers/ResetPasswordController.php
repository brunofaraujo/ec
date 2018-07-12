<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Mail\ResetPasswordMail;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if (!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }

        $this->send($request->email);
        return $this->successResponse();
    }

    public function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email)
    {
        $oldToken = DB::table('password_resets')->where('email')->first();
        if ($oldToken) {
            return $oldToken;
        }

        $token = str_random(60);
        $this->saveToken($token, $email);

        return $token;
    }

    public function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'Email not found.'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Reset email was sent successfully. Please check your inbox.'
        ], Response::HTTP_OK);
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function process(ChangePasswordRequest $request)
    {

        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();

    }

    private function tokenNotFoundResponse() {

        return response()->json([
            'error' => 'Token or Email incorrect', Response::HTTP_UNPROCESSABLE_ENTITY
            // remember to include real email check too!!
        ]);

    }

    private function changePassword($request) {

        $user = User::where('email', $request->email)->first();
        $user->update(['password' => bcrypt($request->password)]);

        $this->getPasswordResetTableRow($request)->delete();

        return response()->json([
            'data' => 'Your password was changed with success.',
            Response::HTTP_CREATED
        ]);

    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }
}

