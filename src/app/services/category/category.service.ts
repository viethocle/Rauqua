import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { apiURL } from "../../constants/apiUrl";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private dataService: DataService) {}

  getCategory(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.categoty.all
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  deleteCategory(id: number): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.categoty.delete + id.toString()
    };
    return this.dataService.delete(resource).pipe(
      map(res => {
        return res;
      })
    );
  }
}
