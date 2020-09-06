import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  async canActivate() {
    console.log(1);
    const user = await this._authService.user$.pipe(first()).toPromise();
    console.log(2);

    if (!user) {
      console.log(3);
      return this._router.parseUrl('/admin/signin');
    }

    console.log(4);
    return true;
  }

}
