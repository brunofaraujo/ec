/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NB_AUTH_OPTIONS} from '../../auth.options';
import {getDeepFromObject} from '../../helpers';

import {NbAuthService} from '../../services';
import {NbAuthResult} from '../../services';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">Change password</h2>
      <small class="form-text sub-title">Please enter a new password</small>
      <form (ngSubmit)="resetPass()" #resetPassForm="ngForm">

        <div *ngIf="errors && errors.length > 0 && !submitted" class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="messages && messages.length > 0 && !submitted" class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>
        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"
                 class="form-control" placeholder="Email address" pattern=".+@.+..+"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email?.errors?.required">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email?.errors?.pattern">
            Email should be the real one!
          </small>
        </div>
        <div class="form-group">
          <label for="input-password" class="sr-only">New Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control form-control-lg first" placeholder="New Password" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password?.errors?.required">
            Password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="
            password.invalid &&
             password.touched &&
              (password?.errors?.minlength ||
               password?.errors?.maxlength)">
            Password should contains
            from {{getConfigValue('forms.validation.password.minLength')}}
            to {{getConfigValue('forms.validation.password.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-re-password" class="sr-only">Confirm Password</label>
          <input
            name="rePass" [(ngModel)]="user.password_confirmation" type="password" id="input-re-password"
            class="form-control form-control-lg last" placeholder="Confirm Password" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"
            [required]="getConfigValue('forms.validation.password.required')">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass?.errors?.required">
            Password confirmation is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            Password does not match the confirm password.
          </small>
        </div>

        <button [disabled]="submitted || !resetPassForm.form.valid" class="btn btn-hero-success btn-block"
                [class.btn-pulse]="submitted">
          Change password
        </button>
      </form>

      <div class="links col-sm-12">
        <small class="form-text">
          Already have an account? <a routerLink="../login"><strong>Sign In</strong></a>
        </small>
        <small class="form-text">
          <a routerLink="../register"><strong>Sign Up</strong></a>
        </small>
      </div>
    </ngx-auth-block>
  `,
})
export class NbResetPasswordComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(private route: ActivatedRoute,
              protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');

    this.setTokenRequest();

  }

  setTokenRequest() {
    this.route.queryParams.subscribe(
      params => {
        this.user.token = params['token']
      },
    )
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
