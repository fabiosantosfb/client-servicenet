import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    _state: RouterStateSnapshot;

    constructor(private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
      this._state = state;
      return this.validateAcess();
    }

    public canLoad(route: Route): boolean | Observable<boolean> | boolean {
        return this.validateAcess();
    }

    private validateAcess() {
      if (localStorage.getItem('currentUser')) {
          return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: this._state.url }});
      return false;
    }
}
