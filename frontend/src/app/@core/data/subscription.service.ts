import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {OptionsService} from './options.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {

  constructor(
    private http: HttpClient,
    private options: OptionsService,
  ) {
  }

  getModalidades(): Observable<any> {
    const apiURL = this.options.API_BASE_URL + '/subscription/modalidades';
    return this.http.get(apiURL).map(
      res => {
        return res;
      },
      err => {
        return err.message;
      },
    );
  }

}
