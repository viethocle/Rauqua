import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from '../../services/product/product.service'
import * as _ from "lodash"
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  products: any[] = []
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.productService.getProduct()
      .subscribe(res => {
        this.products = res
        console.log(this.products)
        this.dtTrigger.next()
      })
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id)
      .subscribe(res =>{
        this.products = _.reject(this.products, ["id", id]);
      })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
