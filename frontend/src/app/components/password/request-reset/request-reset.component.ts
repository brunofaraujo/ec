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
    private snotify: SnotifyService,
  ) { }

  ngOnInit() {
  }

  handleResponse(response) {
    this.snotify.success(response.data, {timeout: 0});
    this.form.email = null;

  }

  onSubmit() {
    this.snotify.info('Processing...', {timeout: 4000});
    this.user.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.snotify.error(error.error.errors.email)
    )
  }

}
