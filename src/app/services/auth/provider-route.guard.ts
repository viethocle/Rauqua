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
export class ProviderRouteGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isCurrentUserProvider) {
      return true;
    }
    this.router.navigate(['order']);
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
