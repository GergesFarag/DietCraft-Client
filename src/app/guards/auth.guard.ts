import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _userSer: UserService) {}

  canActivate(): boolean {
    const token = this._userSer.getCookie('accessToken'); // Check if token exists
    if (!token) {
      this.router.navigate(['/login'] , {
        state : {fromGuard : "Please Login First"}
      });
      return false;
    }
    return true;
  }
}
