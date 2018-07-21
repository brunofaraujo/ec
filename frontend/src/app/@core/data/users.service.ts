import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {OptionsService} from './options.service';

@Injectable()
export class UserService {

  public user;
  public error;

  constructor(
    private http: HttpClient,
    private options: OptionsService,
  ) {
    this.user = [];
    this.error = false;
  }

  getUser(): Observable<any> {
    const apiURL = this.options.API_BASE_URL + '/auth/me';
    return this.http.post(apiURL, null).map(
      res => {
        return res;
      },
      err => {
        return err.message;
      },
    );
  }

  getProfile(): Observable<any> {
    const apiURL = this.options.API_BASE_URL + '/auth/profile';
    return this.http.post(apiURL, null).map(
      res => {
        return res;
      },
      error => {
        return error.message;
      },
    )
  }
}
