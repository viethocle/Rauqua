import { Injectable } from '@angular/core';
import { apiURL } from '../../constants/apiUrl.js';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from '../common/data.service.js';
import { localStorageVariable } from '../../constants/common.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: DataService) { }

  login(parameters: Object): Observable<any> {
    const resource = {
      body: parameters,
      url: apiURL.auth.login
    };

    return this.dataService.post(resource)
      .pipe(
        map(response => {
          if (response && response.isOk) {
            localStorage.setItem(localStorageVariable.USER, JSON.stringify(response.data));
          }
          return response;
        })
      );
  }

  logOut() {
    localStorage.removeItem(localStorageVariable.USER);
  }

  isLoggedIn(): Boolean {
    const user = localStorage.getItem(localStorageVariable.USER);
    if (user) {
      return true;
    }
    return false;
  }
}
