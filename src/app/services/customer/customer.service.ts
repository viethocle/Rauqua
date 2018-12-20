import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { apiURL } from "../../constants/apiUrl";
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { log } from "util";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  constructor(private dataService: DataService) {}

  getCustomer(configPagination: any): Observable<any> {
    const resource = {
      body: null,
      url:
        apiURL.customer.all +
        this.getUrlGetCustomerFromConfparam(configPagination)
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  getUrlGetCustomerFromConfparam(configPagination: any): string {
    return (
      "?perpage=" +
      configPagination.itemsPerPage +
      "&page=" +
      configPagination.currentPage +
      "&keyword=" +
      configPagination.keyword
    );
  }

  updateCustomer(value: any, customerId: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.customer.update + customerId
    };

    return this.dataService.put(resource).pipe(
      map(res => {
        return res.result;
      }),
      catchError(err => throwError(err))
    );
  }

  deletecustomer(id: number): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.customer.delete + id.toString()
    };
    return this.dataService.delete(resource).pipe(
      map(res => {
        return res;
      })
    );
  }
}
