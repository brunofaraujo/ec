import {Injectable} from '@angular/core';
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://localhost:8000/api/auth/login',
    signup: 'http://localhost:8000/api/auth/signup'
  };

  constructor() {
  }

  handle(token) {
    TokenService.setToken(token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = TokenService.getToken();
    if (token) {
      const payload = TokenService.payload(token);

      if (payload) {

        return Object.values(this.iss).indexOf(payload.iss) > -1;

      }
    }
    return false

  }

  static payload(token) {
    const payload = token.split('.')[1];
    return TokenService.decode(payload);

  }

  static decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

}
