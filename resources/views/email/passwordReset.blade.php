@component('mail::message')
# Change password request

To reset your password click on the following button:

@component('mail::button', ['url' => 'http://localhost:4200/reset-password?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
