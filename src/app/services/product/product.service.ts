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

  getProduct(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.product.all
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result.data;
      })
    );
  }

  getProductShop(shopId: any): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.product.shop + shopId
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result.data;
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
