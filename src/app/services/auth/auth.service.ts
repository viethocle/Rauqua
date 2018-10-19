import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { apiURL, serverURL } from '../../constants/apiUrl.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }
  login(parameters) {
    return this.http.post( `${serverURL}${apiURL.auth.login}` , parameters);
  }
}
