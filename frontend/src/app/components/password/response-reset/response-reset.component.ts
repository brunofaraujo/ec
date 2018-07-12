import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };


  constructor(
    private route:ActivatedRoute,
    private user:UserService,
    private router:Router
  ) {
    route.queryParams.subscribe(
      params => {
        this.form.resetToken = params['token']
      }
    )
  }

  ngOnInit() {
  }

  onSubmit() {
    this.user.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data) {
    this.router.navigateByUrl('/login')

  }

  handleError(error) {

  }

}
