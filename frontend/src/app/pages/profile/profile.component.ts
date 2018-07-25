import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/data/users.service';
import {User} from '../../@core/data/user';
import {log} from 'util';

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
  public editButton: CardSettings;

  constructor(private userService: UserService) {

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
    this.userService.getProfile().subscribe(
      (data: User) => {
        this.loading = false;
        this.user = data;
      },
      (error) => {
        this.loading = false;
        this.error = error;
      })
  }
}
