import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { apiURL } from "../../constants/apiUrl";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CouponService {
  constructor(private dataService: DataService) {}

  getCoupon(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.coupon.all
    };
    return this.dataService.get(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  addCoupon(value: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.coupon.create
    };
    return this.dataService.post(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  editCoupon(couponId:any, value: any): Observable<any> {
    const resource = {
      body: value,
      url: apiURL.coupon.edit + couponId
    };
    return this.dataService.post(resource).pipe(
      map(res => {
        return res.result;
      })
    );
  }

  deleteCoupon(id: number): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.coupon.delete + id.toString()
    };
    return this.dataService.delete(resource).pipe(
      map(res => {
        return res;
      })
    );
  }
}
