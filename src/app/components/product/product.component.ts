import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { ProductService } from "../../services/product/product.service";
import * as _ from "lodash";
import { BsModalComponent } from "ng2-bs3-modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Category } from "../../models/category";
import { log } from "util";
import { AuthService } from "app/services/auth/auth.service";
import { CategoryService } from "app/services/category/category.service";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  form: FormGroup;
  selectedFile: File = null;
  url: any =
    "https://image.freepik.com/free-photo/rows-of-colorful-energy-category_1156-662.jpg";
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  products: any[] = [];
  isProvider = this.authService.isCurrentUserProvider;
  categories$: Observable<any[]>;
  category_id: any;
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    this.getListCategory();
    this.getListProducts();
  }
  getListCategory() {
    this.categoryService.getCategory().subscribe(res => {
      this.categories$ = res;
      console.log(this.categories$);
    });
  }

  getListProducts() {
    if (this.isProvider) {
      this.productService.getProductShop(151).subscribe(res => {
        this.products = res;
        console.log(this.products);
        this.dtTrigger.next();
      });
    } else {
      this.productService.getProduct().subscribe(res => {
        this.products = res;
        console.log(this.products);
        this.dtTrigger.next();
      });
    }
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      shop_id: ["", Validators.required],
      category_id: ["", Validators.required],
      describe: ["", Validators.required],
      price: [0, Validators.required],
      origin: ["da nang", Validators.required],
      quantity: [0, Validators.required],
      number_expired: ["", Validators.required],
      image: ["", Validators.required]
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = event => {
        this.url = event.target;
        this.url = this.url.result;
      };
    }
  }


  postProduct(value: any) {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("name", value.name);
    formData.append("category_id", this.category_id);
    formData.append("describe", value.describe);
    formData.append("price", value.price);
    formData.append("origin", value.origin);
    formData.append("quantity", value.quantity);
    formData.append("number_expired", value.number_expired);
    this.productService.postProduct(formData).subscribe(res => {
      console.log(res);
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.products = _.reject(this.products, ["id", id]);
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
