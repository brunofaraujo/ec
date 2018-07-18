import {Component, OnInit} from '@angular/core';
import {NbAuthService} from '../@auth/services';


@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(private authService: NbAuthService) {
  }

  isAuth: any;

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      res => {
        this.isAuth = res;
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
    this.authService.logout('email');
    localStorage.removeItem('auth_app_token');
    this.refreshAuth();
  }
}
