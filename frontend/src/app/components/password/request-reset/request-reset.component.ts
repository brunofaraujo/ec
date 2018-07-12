import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {SnotifyService} from "ng-snotify";
import {consumeBinding} from "@angular/core/src/render3/instructions";

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  constructor(
    private user:UserService,
    private notify: SnotifyService

  ) { }

  ngOnInit() {
  }

  handleResponse(response) {
    console.log(response);
    this.form.email = null;

  }

  onSubmit() {
    this.user.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    )
  }

}
