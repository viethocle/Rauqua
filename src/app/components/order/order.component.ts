import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Subject, fromEvent } from "rxjs";
import { OrderService } from "../../services/order/order.service";
import * as _ from "lodash";
import { map, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})

export class OrderComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  orders: any[] = [];
  keyUpSearch = new Subject<string>();
  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 100,
    keyword: ""
  };

  constructor(private orderService: OrderService) {}

  ngAfterViewInit() {
    const inputSearch = document.getElementById("search-product");
    const inputSearch$ = fromEvent(inputSearch, "keyup")
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500)
      )
      .subscribe(value => {
        {
          this.configPagination.keyword = value;
          this.getOrders();
        }
      });
  }
  ngOnInit() {
    this.getOrders();
  }

  onChangeCount($event) {
    this.getOrders();
  }

  getPage(page: number) {
    this.configPagination.currentPage = page;
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrder(this.configPagination).subscribe(res => {
      this.orders = res.data;
      this.configPagination.totalItems = res.paginator.total;
    });
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(res => {
      this.orders = _.reject(this.orders, ["id", id]);
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
