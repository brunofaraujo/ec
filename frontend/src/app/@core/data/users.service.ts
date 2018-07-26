import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {OptionsService} from './options.service';
import {User} from './user';

@Injectable()
export class UserService {
  public error;

  constructor(
    private http: HttpClient,
    private options: OptionsService,
  ) {
    this.error = false;
  }

  getUser(): Observable<User> {
    const apiURL = this.options.API_BASE_URL + '/user/me';
    return this.http.post(apiURL, null).map(
      (res: User) => {
        return res;
      },
      error => {
        return error.error.errors; // || err.message;
      },
    );
  }

  getProfile(): Observable<User> {
    const apiURL = this.options.API_BASE_URL + '/user/profile';
    return this.http.post(apiURL, null).map(
      (res: User) => {
        return res;
      },
      error => {
        return error.error.errors; // || error.message;
      },
    )
  }

  updateProfile(data): Observable<object> {
    const apiURL = this.options.API_BASE_URL + '/user/update-profile';
    return this.http.post(apiURL, data).map(
      (res: object) => {
        return res;
      },
      error => {
        return error.error.errors; // || error.message;
      },
    )
  }
}
