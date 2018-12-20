import {
  Component,
  OnInit,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { ToastsManager } from "ng6-toastr";
import { FormBuilder } from "@angular/forms";
import { CustomerService } from "app/services/customer/customer.service";
import { Subject, fromEvent } from "rxjs";
import { map, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit, AfterViewInit {
  customers: any;
  keyUpSearch = new Subject<string>();
  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 100,
    keyword: ""
  };
  
  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getListCustomers();
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
          this.getListCustomers();
        }
      });
  }
  onChangeCount($event) {
    this.getListCustomers();
  }
  getPage() {
    
  }
  getListCustomers() {
    this.customerService.getCustomer(this.configPagination).subscribe(res => {
      this.customers = res.data;
      console.log(this.customers);
      this.configPagination.totalItems = res.paginator.total;
    });
  }
}
