import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '../Security/JwtHelperService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.jwtHelper.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return false;
    }

    const requiredRoles = route.data['roles'] || [];

    if (requiredRoles.length > 0 && !this.jwtHelper.hasAnyRole(requiredRoles)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
