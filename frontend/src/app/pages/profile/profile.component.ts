import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/data/users.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public loading: boolean = false;
  public user;
  public error;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getProfile().subscribe((data) => {
      this.loading = false;
      this.user = data;
    },
      (error) => {
      this.loading = false;
      this.error = error;
      })
  }
}
