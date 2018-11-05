import { DataService } from './../common/data.service';
import { routePath } from './../../constants/common.js';
import { Injectable } from '@angular/core';
import { apiURL } from '../../constants/apiUrl';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { localStorageKey } from '../../constants/common';
import { Router } from '@angular/router';

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
    return this.dataService.post(resource)
      .pipe(
        map(response => {
          if (response && response.isOk) {
            localStorage.setItem(localStorageKey.USER, JSON.stringify(response.data));
          }
          return response;
        })
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
