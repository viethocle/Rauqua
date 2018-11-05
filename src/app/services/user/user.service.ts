import { DataService } from './../common/data.service';
import { Injectable } from '@angular/core';
import { apiURL } from '../../constants/apiUrl';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dataService: DataService,
  ) { }

  getUser(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.user.all
    };
    return  this.dataService.get(resource)
    .pipe(
      map(res => {
        return res.result.data
      })
    )
  }

  deleteUser(id: number): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.user.delete + id.toString()
    };
    return  this.dataService.get(resource) 
    .pipe(
      map(res => {
        return res.result.data
      })
    )
  }
}
