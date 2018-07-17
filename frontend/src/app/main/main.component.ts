import {Component, OnInit} from '@angular/core';
import {NbAuthService} from "@nebular/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(private authService: NbAuthService,
              private router: Router) {
  }

  isAuth: boolean;

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      res => {
        this.isAuth = res;
      }
    )
  }

  refreshAuth() {
    this.authService.isAuthenticated().subscribe(
      res => {
        this.isAuth = res;
      }
    )
  }

  /*  logout() {
      localStorage.removeItem('auth_app_token');
      this.refreshAuth();
    }*/

  sair():void {
    console.log(this.authService.logout('email'));
  }
}
