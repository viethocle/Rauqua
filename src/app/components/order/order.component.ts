import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { OrderService } from "../../services/order/order.service";
import * as _ from "lodash";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    this.orderService.getOrder().subscribe(res => {
      this.orders = res;
      this.dtTrigger.next();
    });
  }

  deleteorder(id: number) {
    this.orderService.deleteOrder(id).subscribe(res => {
      this.orders = _.reject(this.orders, ["id", id]);
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
