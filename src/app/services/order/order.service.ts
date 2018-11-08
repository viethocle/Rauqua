import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { apiURL } from "../../constants/apiUrl";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private dataService: DataService) {}

  getOrder(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.order.all
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.data;
      })
    );
  }

  deleteOrder(id: number): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.order.delete + id.toString()
    };
    return this.dataService.delete(resource).pipe(
      map(res => {
        return res;
      })
    );
  }
}
