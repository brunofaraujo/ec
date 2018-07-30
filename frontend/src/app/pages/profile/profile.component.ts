import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/data/users.service';
import {User} from '../../@core/data/user';
import {PasswordModalComponent} from './password-modal/password-modal.component';
import {NgbDatepickerConfig, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  on: boolean;
}

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public loading: boolean;
  public user: User;
  public error;
  public isEditing: boolean;
  public submitting: boolean;
  public success: boolean;
  public successMsg;
  public editButton: CardSettings;
  public birthday: NgbDateStruct;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private datepickerOptions: NgbDatepickerConfig,
  ) {

    this.success = false;
    this.submitting = false;
    this.loading = false;
    this.isEditing = false;
    this.editButton = {
      title: 'Habilitar Edição',
      iconClass: 'nb-compose',
      type: 'success',
      on: false,
    };
  }

  ngOnInit() {
    this.loading = true;
    this.getProfile();
    this.datepickerOptions.minDate = {year: 1910, month: 1, day: 1};
    this.datepickerOptions.maxDate = {year: 2018, month: 1, day: 1};
  }

  getProfile() {
    this.userService.getProfile().subscribe(
      (data: User) => {
        this.loading = false;
        data.profile.nascimento = this.parseDate(data.profile.nascimento);
        this.user = data;
      },
      (error) => {
        this.loading = false;
        this.error = error.error.errors;
      })
  }

  static scrollTop() {
    const x = document.querySelector('#top');
    if (x) {
      x.scrollIntoView();
    }
  }

  onSubmit() {
    this.successMsg = undefined;
    this.submitting = true;
    this.userService.updateProfile(this.user).subscribe(
      data => {
        this.submitting = false;
        this.editButton.on = false;
        this.getProfile();
        this.success = true;
        this.successMsg = data;
        ProfileComponent.scrollTop();
      },
      error => {
        this.submitting = false;
        this.editButton.on = false;
        this.error = error.error.errors;
        ProfileComponent.scrollTop();
      },
    )
  }

  parseDate(date): NgbDateStruct {
    if (date.length > 0) {
      date = date.split('-');
      return {
        year: Number(date[0]),
        month: Number(date[1]),
        day: Number(date[2]),
      }
    }
  }

  showStaticModal() {
    const activeModal = this.modalService.open(PasswordModalComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
    });
    activeModal.componentInstance.modalHeader = 'Change password';
    activeModal.componentInstance.pwdForm = {
      id: this.user.id,
      password: null,
      newPassword: null,
      password_confirmation: null,
    };
  }
}
