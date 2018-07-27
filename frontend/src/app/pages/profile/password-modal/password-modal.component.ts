import {Component, Inject} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {getDeepFromObject} from '../../../@auth/helpers';
import {NB_AUTH_OPTIONS} from '../../../@auth/auth.options';
import {NbAuthService} from '../../../@auth/services';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()" nbPopover="Fechar" nbPopoverMode="hint">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form novalidate class="ng-untouched ng-pristine ng-valid" #passwordForm="ngForm" (ngSubmit)="changePass()">
        <div *ngIf="errors && !messages" class="alert alert-danger" role="alert">
          <div class="text-center"><strong>Oh snap!</strong></div>
          <p *ngFor="let error of errors" class="text-center">{{ error.value }}</p>
        </div>
        <div *ngIf="messages && !errors" class="alert alert-success" role="alert">
          <div class="text-center"><strong>Hooray!</strong></div>
          <p class="text-center">{{ messages.data }}</p>
        </div>
        <div class="form-group">
          <label for="inputCurrentPassword">Current password</label>
          <input name="password" [(ngModel)]="pwdForm.password" type="password" id="inputCurrentPassword"
                 class="form-control form-control-lg first" #password="ngModel"
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
          <label for="inputNewPassword">New password</label>
          <input name="newPassword" [(ngModel)]="pwdForm.newPassword" type="password" id="inputNewPassword"
                 class="form-control form-control-lg first" #newPassword="ngModel"
                 [class.form-control-danger]="newPassword.invalid && newPassword.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error"
                 *ngIf="newPassword.invalid && newPassword.touched && newPassword?.errors?.required">
            New password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="
            newPassword.invalid &&
             newPassword.touched &&
              (newPassword?.errors?.minlength ||
               newPassword?.errors?.maxlength)">
            Password should contains
            from {{getConfigValue('forms.validation.password.minLength')}}
            to {{getConfigValue('forms.validation.password.maxLength')}}
            characters
          </small>
        </div>
        <div class="form-group">
          <label for="inputPasswordConfirmation">Confirm Password</label>
          <input name="newPassword_confirmation" [(ngModel)]="pwdForm.newPassword_confirmation"
                 type="password" id="inputPasswordConfirmation"
                 class="form-control form-control-lg last" #rePass="ngModel"
                 [class.form-control-danger]="(rePass.invalid || newPassword.value !== rePass.value) && rePass.touched"
                 required>
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass?.errors?.required">
            New password confirmation is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && newPassword.value != rePass.value && !rePass.errors?.required">
            Password does not match the confirm password.
          </small>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="submit" *ngIf="!success" [disabled]="passwordForm.invalid"
                  class="btn btn-info"><i class="fa fa-paper-plane"></i> Enviar
          </button>
        </div>
      </form>
    </div>
  `,
})
export class PasswordModalComponent {

  errors;
  messages;
  pwdForm: {
    id,
    password,
    newPassword,
    newPassword_confirmation,
  };
  modalHeader: string;
  success: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private authService: NbAuthService,
  ) {
  }

  closeModal() {
    this.activeModal.close();
  }

  changePass() {
    this.authService.changePass(this.pwdForm).subscribe(
      data => {
        this.errors = false;
        this.success = true;
        this.messages = data;
      },
      error => {
        this.messages = false;
        this.success = false;
        this.errors = Object.keys(error.error.errors).map(key => ({type: key, value: error.error.errors[key]}));
      },
    )
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
