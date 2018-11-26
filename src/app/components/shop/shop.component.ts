import { Component, OnInit, ViewChild } from '@angular/core';
import { FlyInOut } from './flyInOut.animate';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { BsModalComponent } from 'ng2-bs3-modal';
import { FormGroup } from '@angular/forms';
import { UserService } from 'app/services/user/user.service';
import { log } from 'util';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  animations: [FlyInOut]
})
export class ShopComponent implements OnInit {
  controls: any;
  @ViewChild("modalCreate") modalCreate: BsModalComponent;
  @ViewChild(PerfectScrollbarComponent)
  componentScroll: PerfectScrollbarComponent;
  // @ViewChildren("listCustomers") listCustomers;
  formNewOrder: FormGroup;
  // @Output() newOrder = new EventEmitter<Order>();
  minDueDate: any;
  customers: any[] = [];
  termCustomer = "";
  currentFocusIndex: number = -1;
  customerSelected: any;
  totalPrice: number = 0;


  contents: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getProvider()
  }

  getProvider(){
    this.userService.getProvider().subscribe(
      res => {
        console.log("provider:", res)
      }
    )

  }
  createShop(){}

}
