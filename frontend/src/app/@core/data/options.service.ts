import {Injectable} from '@angular/core';

@Injectable()
export class OptionsService {

  API_BASE_URL: string;

  constructor() {
    this.API_BASE_URL = 'http://localhost:8000/api';
  }
}
