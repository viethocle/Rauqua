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
import { log } from 'util';

@Injectable()
export class AdminRouteGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.authService.isCurrentUserAdmin)
    if (this.authService.isCurrentUserAdmin) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
