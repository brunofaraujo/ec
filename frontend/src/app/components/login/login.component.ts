import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public response = null;
  public error = null;

  constructor(
    private user:UserService,
    private token:TokenService,
    private router:Router,
    private auth:AuthService
  ) { }

  ngOnInit() {

  }

  handleResponse(response) {
    this.token.handle(response.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('profile');
  }

  handleError(error) {
    this.error = error.error.error || error.message;
  }

  onsubmit() {
    this.error = null;
    this.response = null;
    return this.user.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

}
