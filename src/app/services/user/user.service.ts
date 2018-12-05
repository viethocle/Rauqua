import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { apiURL } from "../../constants/apiUrl";
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { log } from "util";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private dataService: DataService) {}

  getUser(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.manager.all
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  getResource():Observable<any>{
    const resource = {
      body: null,
      url: apiURL.resources.all
    }
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result
      }),
      catchError(err => throwError(err))
    )
  }

  createUser(value: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.manager.create
    }

    return this.dataService.post(resource).pipe(
      map(res => {
        return res.result
      }),
      catchError(err => throwError(err))
    )
  }

  updateUser(value: any, userId: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.manager.update + userId
    }

    return this.dataService.put(resource).pipe(
      map(res => {
        return res.result
      }),
      catchError(err => throwError(err))
    )
  }

  getProvider(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.manager.provider
    }

    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result

      })
    )
  }

  deleteUser(id: number): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.user.delete + id.toString()
    };
    return this.dataService.delete(resource).pipe(
      map(res => {
        return res;
      })
    );
  }
}
