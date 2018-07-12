import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {TokenService} from "./token.service";
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.token.loggedIn();
  }

  constructor(private token:TokenService) { }
}
