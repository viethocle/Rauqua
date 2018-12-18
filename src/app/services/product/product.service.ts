import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { apiURL } from "../../constants/apiUrl";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private dataService: DataService) {}

  getProduct(configPagination: any): Observable<any> {
    const resource = {
      body: null,
      url:
        apiURL.product.all +
        this.getUrlGetProductFromConfparam(configPagination)
    };
    return this.getProductWithPage(resource);
  }

  getProductShop(shopId: any, configPagination: any): Observable<any> {
    const resource = {
      body: null,
      url:
        apiURL.product.shop +
        shopId +
        this.getUrlGetProductFromConfparam(configPagination)
    };
    return this.getProductWithPage(resource);
  }

  getUrlGetProductFromConfparam(configPagination: any): string {
    return (
      "?perpage=" +
      configPagination.itemsPerPage +
      "&page=" +
      configPagination.currentPage +
      "&keyword=" +
      configPagination.keyword
    );
  }
  getProductWithPage(resource: any): Observable<any> {
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  postProduct(value: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.product.post
    };
    return this.dataService.post(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  editProduct(product_id: any, value: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.product.edit + product_id
    };
    return this.dataService.put(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.product.delete + id.toString()
    };
    return this.dataService.delete(resource).pipe(
      map(res => {
        return res;
      })
    );
  }
}
