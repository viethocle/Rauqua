import { Component, OnInit, AfterViewInit, ViewContainerRef } from "@angular/core";
import { Subject, fromEvent } from "rxjs";
import { OrderService } from "../../services/order/order.service";
import * as _ from "lodash";
import { map, debounceTime } from "rxjs/operators";
import { ToastsManager } from "ng6-toastr";

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

  public statusOrder = {
    ready: "Đang xử lý",
    todo: "Đã xử lý",
    cancel: "Đã hủy",
    done: "Thành công"
  };
  public statusOrderID = {
    "Đang xử lý": 1,
    "Đã xử lý": 11,
    "Đã hủy": 21,
    "Thành công": 31
  };

  public statusPayment = {
    no: "Chưa thanh toán",
    yes: "Đã thanh toán"
  };

  public statusPaymentID = {
    "Chưa thanh toán": 1,
    "Đã thanh toán": 2
  };

  constructor(
    private orderService: OrderService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

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

  updateStatus(order: any, statusOrder: string) {
    this.orders.forEach(e => {
      if (e.id == order.id) {
        e.process_status.name = statusOrder;
        e.process_status.id = this.statusOrderID[statusOrder];
      }
    });
    this.updateOrder(order);
  }

  updatePayment(order: any, statusPayment: string) {
    this.orders.forEach(e => {
      if (e.id == order.id) {
        e.payment_status = statusPayment;
        e.payment_method_id = this.statusPaymentID[statusPayment];
      }
    });
    this.updateOrder(order);
  }

  updateOrder(order: any) {
    this.orderService.updateOrder(order).subscribe(res => {
      this.toastr.success("Chuyển trạng thái thành công!");
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
