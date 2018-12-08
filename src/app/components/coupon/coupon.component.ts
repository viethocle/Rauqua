import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { CouponService } from "../../services/coupon/coupon.service";
import * as _ from "lodash";

@Component({
  selector: "app-coupon",
  templateUrl: "./coupon.component.html",
  styleUrls: ["./coupon.component.css"]
})
export class CouponComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  coupons: any[] = [];

  constructor(private couponservice: CouponService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    this.getListCoupon();
  }

  getListCoupon() {
    this.couponservice.getCoupon().subscribe(res => {
      this.coupons = res;
      this.dtTrigger.next();
    });
  }

  openModalAddCoupon() {}

  deleteUser(id: number) {
    this.couponservice.deleteCoupon(id).subscribe(res => {
      this.coupons = _.reject(this.coupons, ["id", id]);
    });
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
