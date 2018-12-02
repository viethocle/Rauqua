import { Injectable } from "@angular/core";
import { DataService } from "./../common/data.service";
import { Observable } from "rxjs";
import { Resource } from "../../models/resource";
import { apiURL } from "../../constants/apiUrl";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ShopService {
  constructor(private dataService: DataService) {}

  getShops(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.shop.all
    };

    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  addShop(value: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.shop.create,
    };

    return this.dataService.post(resource).pipe(
      map(res => {
        console.log(res)
        return res.result;
      })
    );
  }

  editShop(shopid: any, value: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.shop.edit + shopid,
    };

    return this.dataService.put(resource).pipe(
      map(res => {
        console.log(res)
        return res.result;
      })
    );
  }

  deleteShop(shopId: any): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.shop.delete + shopId
    };

    return this.dataService.delete(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }
}
