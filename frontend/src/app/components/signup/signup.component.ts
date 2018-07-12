import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    password: null,
    password_confirmation: null
  };

  public error = {
    email: null,
    password: null,
    password_confirmation: null
  };

  public response = null;

  constructor(
    private user:UserService,
    private router:Router,
    private token:TokenService
  ) { }

  ngOnInit() {
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponse(response) {
    this.token.handle(response.access_token);
    this.router.navigateByUrl('profile');
  }

  onSubmit() {
    this.error = null;
    this.response = null;
    return this.user.signup(this.form).subscribe(
      data => {
        this.handleResponse(data)
      },
      error => {
        this.handleError(error)
      }
    )
  }
}
