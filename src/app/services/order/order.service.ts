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

  getOrder(configPagination: any): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.order.all + this.getUrlGetOrderFromConfparam(configPagination)
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res;
      })
    );
  }
  updateOrder(order: any): Observable<any> {
    let value = "?processing_status=" + order.process_status.id  + "&payment_status=" + order.payment_method_id 
    const resource = {
      body: null,
      url: apiURL.order.update + order.id + value
    };
    return this.dataService.put(resource).pipe(
      map(res => {
        return res;
      })
    );
  }

  getUrlGetOrderFromConfparam(configPagination: any): string {
    return (
      "?perpage=" +
      configPagination.itemsPerPage +
      "&page=" +
      configPagination.currentPage +
      "&keyword=" +
      configPagination.keyword
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
