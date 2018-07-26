import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/data/users.service';
import {User} from '../../@core/data/user';

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
  public submiting: boolean;
  public success: boolean;
  public successMsg;
  public editButton: CardSettings;

  constructor(
    private userService: UserService,
    ) {

    this.success = false;
    this.submiting = false;
    this.loading = false;
    this.isEditing = false;
    this.editButton = {
      title: 'Habilitar Edição',
      iconClass: 'nb-compose',
      type: 'success',
      on: false,
    }
  }

  ngOnInit() {
    this.loading = true;
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe(
      (data: User) => {
        this.loading = false;
        this.user = data;
      },
      (error) => {
        this.loading = false;
        this.error = error.error.errors;
      })
  }

  scrollTop() {
    const x = document.querySelector('#top');
    if (x) {
      x.scrollIntoView();
    }
  }

  onSubmit() {
    this.successMsg = undefined;
    this.submiting = true;
    this.userService.updateProfile(this.user).subscribe(
      data => {
        this.submiting = false;
        this.editButton.on = false;
        this.getProfile();
        this.success = true;
        this.successMsg = data;
        this.scrollTop();
      },
      error => {
        this.submiting = false;
        this.editButton.on = false;
        this.error = error.error.errors;
        this.scrollTop();
      },
    )
  }
  // TODO: Make the whole change password business.
}
