import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http:HttpClient) { }

  signup(data) {
    return this.http.post(this.baseUrl+'auth/signup', data)
  }

  login(data) {
    return this.http.post(this.baseUrl+'auth/login', data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(this.baseUrl+'auth/send_password_reset_link', data)
  }

  changePassword(data) {
    return this.http.post(this.baseUrl+'auth/reset_password', data)
  }

}
