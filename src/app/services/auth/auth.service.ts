import { DataService } from "./../common/data.service";
import { routePath } from "./../../constants/common.js";
import { Injectable } from "@angular/core";
import { apiURL } from "../../constants/apiUrl";
import { map } from "rxjs/operators";
import { Observable, throwError, BehaviorSubject, Subject } from "rxjs";
import { localStorageKey } from "../../constants/common";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { catchError } from "rxjs/operators";
export enum RoleUser {
  admin = 'admin',
  mod = 'mod',
  provider = 'provider'
}

@Injectable({
  providedIn: "root"
})

export class AuthService {
  public userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public doneValidateToken$ = new Subject();

  constructor(private dataService: DataService, private router: Router) {
    if (this.isLoggedIn()) {
      this.userSignedIn$.next(true);
      this.doneValidateToken$.next();
    } else {
      this.router.navigate(["/login"]);
      this.userSignedIn$.next(false);
      console.log("error when validatoken on init");
    }
  }

  login(parameters: Object): Observable<any> {
    const resource = {
      body: parameters,
      url: apiURL.auth.login
    };
    return this.dataService.login(resource).pipe(
      map(response => {
        if (response && response.code == 200) {
          localStorage.setItem(
            localStorageKey.USER,
            JSON.stringify(response.result)
          );
        }
        this.userSignedIn$.next(true);
        return response;
      }),
      catchError(err => throwError(err))
    );
  }

  logOut() {
    this.userSignedIn$.next(false);
    localStorage.removeItem(localStorageKey.USER);
    this.router.navigate([`/${routePath.LOGIN}`]);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(localStorageKey.USER);
    if (user) {
      return true;
    }
    return false;
  }

  currentUserName(): string {
    let user = JSON.parse(localStorage.getItem(localStorageKey.USER));
    return user.user.username;
  }

  currentUserData(): string {
    let user = JSON.parse(localStorage.getItem(localStorageKey.USER));
    return user.manager;
  }

  get isCurrentUserMod() {
    return _.get(this.currentUserData(), 'role') === RoleUser.mod;
  }

  get isCurrentUserAdmin() {
    return _.get(this.currentUserData(), 'role') === RoleUser.admin;
  }

  get isCurrentUserProvider() {
    return _.get(this.currentUserData(), 'role') === RoleUser.provider;
  }
}
