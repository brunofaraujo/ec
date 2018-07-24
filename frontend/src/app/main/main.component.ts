import {Component, OnInit} from '@angular/core';
import {NbAuthService} from '../@auth/services';
import {NbMenuItem} from '@nebular/theme';
import {UserService} from '../@core/data/users.service';
import {User} from '../@core/data/user';


@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  user: User;

  userMenu: NbMenuItem[] = [
    {
      title: 'Profile',
      link: '/pages/user',
    },
    {
      title: 'Log out',
      link: '/auth/logout',
    },
  ];

  isAuth: boolean = false;

  constructor(
    private authService: NbAuthService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (res) => {
        this.isAuth = res;
        this.userService.getProfile().subscribe(
          (user) => {
            this.user = user;
          },
        )
      },
      (error) => {
        this.isAuth = error;
      },
    )
  }

  refreshAuth() {
    this.authService.isAuthenticated().subscribe(
      res => {
        this.isAuth = res;
      },
    )
  }

  logout() {
    this.authService.logout();
    this.refreshAuth();
  }
}
