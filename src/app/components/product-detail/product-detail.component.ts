import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { ProductService } from 'app/services/product/product.service';
import { ToastsManager } from 'ng6-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail: any;
  currentProductId: any

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    public toastr: ToastsManager,
    private route: ActivatedRoute,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentProductId = params["id"];
    });
    this.getProductDetail(this.currentProductId);
  }

  getProductDetail(productId: any){
    this.productService.getProductDetail(productId).subscribe(res => {
      this.productDetail = res;
    });
  }
}
