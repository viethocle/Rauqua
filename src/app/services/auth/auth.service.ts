import { DataService } from './../common/data.service';
import { routePath } from './../../constants/common.js';
import { Injectable } from '@angular/core';
import { apiURL } from '../../constants/apiUrl.js';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { localStorageKey } from '../../constants/common.js';
import { Router } from '@angular/router';
import { log } from 'util';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  login(parameters: Object): Observable<any> {
    const resource = {
      body: parameters,
      url: apiURL.auth.login
    };
    return this.dataService.login(resource)
      .pipe(
        map(response => {
          if (response && response.code == 200) {
            localStorage.setItem(localStorageKey.USER, JSON.stringify(response.result));
          }
          return response;
        }),
        catchError(err => throwError(err))
      );
  }

  logOut() {
    localStorage.removeItem(localStorageKey.USER);
    this.router.navigate([`/${routePath.LOGIN}`]);
  }

  isLoggedIn(): Boolean {
    const user = localStorage.getItem(localStorageKey.USER);
    if (user) {
      return true;
    }
    return false;
  }
}