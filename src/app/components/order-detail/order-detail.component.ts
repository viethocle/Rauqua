import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OrderService } from 'app/services/order/order.service';
import { AuthService } from 'app/services/auth/auth.service';
import { ToastsManager } from 'ng6-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  currentOrderId: any;
  orderDetail: any;
  constructor(
    private orderService:OrderService,
    public authService: AuthService,
    public toastr: ToastsManager,
    private route: ActivatedRoute,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentOrderId = params["id"];
    });
    this.getOrderDetail(this.currentOrderId);
  }

  getOrderDetail(orderId: any){
    this.orderService.getOrderDetail(orderId).subscribe(res => {
      this.orderDetail = res;
    });
  }
}
