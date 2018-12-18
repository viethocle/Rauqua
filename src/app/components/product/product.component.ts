import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterContentInit,
  AfterViewInit
} from "@angular/core";
import { Subject, Observable, fromEvent } from "rxjs";
import { ProductService } from "../../services/product/product.service";
import * as _ from "lodash";
import { BsModalComponent } from "ng2-bs3-modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Category } from "../../models/category";
import { log } from "util";
import { AuthService } from "app/services/auth/auth.service";
import { CategoryService } from "app/services/category/category.service";
import { ToastsManager } from "ng6-toastr";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { debounceTime, map } from "rxjs/operators";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  form: FormGroup;
  selectedFile: File = null;
  url: any =
    "https://image.freepik.com/free-photo/rows-of-colorful-energy-category_1156-662.jpg";
  products: any[] = [];
  isProvider = this.authService.isCurrentUserProvider;
  categories$: Observable<any[]>;
  category_id: any;
  keyUpSearch = new Subject<string>();
  product: any;
  currentPage = 1;
  currentSearch = "";
  showCount: number = 10;
  currentShop: any;
  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 100,
    keyword: ""
  };
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public authService: AuthService,
    public toastr: ToastsManager,
    private route: ActivatedRoute,
    private router: Router,
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
          this.getListProducts();
        }
      });
  }

  ngOnInit() {
    this.buildForm();
    this.getListCategory();
    this.getListProducts();
  }

  getListCategory() {
    this.categoryService.getCategory().subscribe(res => {
      this.categories$ = res;
    });
  }

  getListProducts() {
    if (this.isProvider) {
      this.currentShop = this.authService.shopInfor;
      if (this.currentShop == null) {
        this.products = null;
      } else {
        this.productService
          .getProductShop(this.currentShop.id, this.configPagination)
          .subscribe(res => {
            this.assignAfterGetProduct(res);
          });
      }
    } else {
      this.productService.getProduct(this.configPagination).subscribe(res => {
        this.assignAfterGetProduct(res);
      });
    }
  }

  assignAfterGetProduct(res: any) {
    this.products = res.data;
    this.configPagination.totalItems = res.paginator.total;
  }
  onChangeCount($event) {
    this.getListProducts();
  }

  getPage(page: number) {
    this.configPagination.currentPage = page;
    this.getListProducts();
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
      number_expired: ["", Validators.required]
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
    formData.append("shop_id", this.currentShop.id);
    formData.append("category_id", this.category_id);
    formData.append("describe", value.describe);
    formData.append("price", value.price);
    formData.append("origin", value.origin);
    formData.append("quantity", value.quantity);
    formData.append("number_expired", value.number_expired);
    this.productService.postProduct(formData).subscribe(res => {
      this.products.unshift(res);
      this.toastr.success("Tạo mới thành công!");
    });
    this.modal.close();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.products = _.reject(this.products, ["id", id]);
    });
  }

  openModalEdit(product: any) {
    this.modalEdit.open();
    this.product = product;
    this.form.patchValue({
      name: product.name,
      shop_id: product.shop_id,
      category_id: product.category_id,
      describe: product.describe,
      price: product.price,
      origin: product.origin,
      quantity: product.quantity,
      number_expired: 5
    });
  }

  editProduct(value: any) {
    value = _.pickBy(value);
    this.productService.editProduct(this.product.id, value).subscribe(res => {
      this.toastr.success("Chỉnh sửa thành công!");
    });
    this.modalEdit.close();
  }
}
