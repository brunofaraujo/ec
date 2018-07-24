import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {NbAuthService} from './@auth';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: NbAuthService,
    private router: Router,
  ) {
  }

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/auth/login']);
        }
      }),
    );
  }

  canActivateChild() {
    return this.authService.isAuthenticated().pipe(
      tap( authenticated => {
        if (!authenticated) {
          this.router.navigate(['/auth/login']);
        }
      },
    ),
    )
  }

}
