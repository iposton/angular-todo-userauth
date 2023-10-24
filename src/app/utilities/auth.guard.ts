import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
class PermissionsService {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(this.authenticationService.userValue, 'canactivate?')
    const user = this.authenticationService.userValue;
    if (user) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
