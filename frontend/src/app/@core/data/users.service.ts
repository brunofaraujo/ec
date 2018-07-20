import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  public user;
  public error;

  constructor(private http: HttpClient) {
    this.user = [];
    this.error = false;
  }

  getUser(): Observable<any> {
    const apiURL = 'http://localhost:8000/api/auth/me';
    return this.http.post(apiURL, null).map(
      res => {
        return res;
      },
      err => {
        return err.message;
      },
    );
  }
}
