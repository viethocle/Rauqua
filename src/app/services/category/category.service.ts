import { DataService } from './../common/data.service';
import { routePath } from './../../constants/common.js';
import { Injectable } from '@angular/core';
import { apiURL } from '../../constants/apiUrl';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { localStorageKey } from '../../constants/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  getCategory(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.categoty.all
    };
    return  this.dataService.get(resource)
    .pipe(
      map(res => {
        return res.result
      })
    )
  }
}
