import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { AuthService } from './auth.service';

@Injectable()
export class ModRouteGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isCurrentUserMod) {
      return true;
    }
    this.router.navigate(['shop']);
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
