import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  Renderer2
} from "@angular/core";
import { FlyInOut } from "./flyInOut.animate";
import { PerfectScrollbarComponent } from "ngx-perfect-scrollbar";
import { BsModalComponent } from "ng2-bs3-modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "app/services/user/user.service";
import { log } from "util";
import { ConditionalExpr } from "@angular/compiler";
import { ShopService } from "app/services/shop/shop.service";
import { Subject } from "rxjs";
import { ToastsManager } from "ng6-toastr";
import * as _ from "lodash";
@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
  animations: [FlyInOut]
})
export class ShopComponent implements OnInit {
  controls: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild("modalCreate") modalCreate: BsModalComponent;
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  @ViewChild(PerfectScrollbarComponent)
  componentScroll: PerfectScrollbarComponent;
  // @ViewChildren("listCustomers") listCustomers;
  form: FormGroup;
  // @Output() newOrder = new EventEmitter<Order>();
  minDueDate: any;
  customers: any[] = [];
  termCustomer = "";
  currentFocusIndex: number = -1;
  customerSelected: any;
  totalPrice: number = 0;
  shops: any;
  provider: any;
  selectedFile: File = null;
  isEdit = false;
  chooseEditImage = false;
  shopEdit: any;
  url: any =
    "https://image.freepik.com/free-photo/rows-of-colorful-energy-category_1156-662.jpg";

  contents: any;
  constructor(
    private userService: UserService,
    private cdRef: ChangeDetectorRef,
    private shopService: ShopService,
    private fb: FormBuilder,
    private renderer2: Renderer2,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.buildForm();
    this.getShops();
    this.getProvider();
  }
  buildForm() {
    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      provider_id: ["", Validators.required],
      address: ["", Validators.required],
      phone: [
        "",
        Validators.compose([Validators.required, Validators.minLength(9)])
      ]
    });
  }

  getShops() {
    this.shopService.getShops().subscribe(shops => {
      this.shops = shops;
      this.dtTrigger.next();
    });
  }

  getProvider() {
    this.userService.getProvider().subscribe(res => {
      this.provider = res;
    });
  }

  openModalAddShop() {
    this.form.reset();
    this.modalCreate.open();
  }

  onFileSelected(event) {
    if (this.isEdit) {
      this.chooseEditImage = true;
    }
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

  createShop() {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("name", this.form.value.name);
    formData.append("provider_id", this.form.value.provider_id);
    formData.append("address", this.form.value.address);
    formData.append("phone", this.form.value.phone);
    this.shopService.addShop(formData).subscribe(res => {
      this.shops.unshift(res);
      this.toastr.success("Đã tạo cửa hàng thành công!");
      this.form.reset();
      this.modalCreate.close();
    });
  }

  openModalEditShop(shop: any) {
    this.shopEdit = shop;
    this.modalEdit.open();
    this.isEdit = true;
    this.setFormValue(shop);
  }

  closeModalEditShop() {
    this.isEdit = false;
    this.modalEdit.dismiss();
  }

  editShop() {
    const formData: FormData = new FormData();

    formData.append("name", this.form.value.name);
    formData.append("provider_id", this.form.value.provider_id);
    formData.append("address", this.form.value.address);
    formData.append("phone", this.form.value.phone);
    if (this.chooseEditImage) {
      formData.append("image", this.selectedFile, this.selectedFile.name);
    }

    this.shopService
      .editShop(this.shopEdit.id, this.form.value)
      .subscribe(shop => {
        _.assign(this.shops.find(t => t.id === shop.id), shop);
        this.toastr.success("Đã sửa thành công!");
        this.form.reset();
        this.modalEdit.close();
        this.chooseEditImage = false;
        this.isEdit = false;
      });
  }

  deleteShop(shopId: any) {
    this.shopService.deleteShop(shopId).subscribe(res => {
      this.shops = _.reject(this.shops, ["id", shopId]);
      this.toastr.success("Đã xóa shop!");
    });
  }

  chooseCustomer() {
    if (this.currentFocusIndex === -1) return;
    let listsButton = this.provider.toArray().map(res => res.nativeElement);
    let selectedCustomerId =
      listsButton[this.currentFocusIndex].dataset.idcustomer;
    let selectedCustomer = this.customers.find(
      cus => cus.id === _.toNumber(selectedCustomerId)
    );
    this.selectCustomer(selectedCustomer);
  }

  // * handle event keyup enter and click customer
  selectCustomer(cus: any) {
    this.customerSelected = cus;
    this.form.patchValue({
      provider_id: this.customerSelected.id
    });
    this.termCustomer = "";
  }

  shiftFocusDown(e) {
    e.preventDefault();
    let lengthResults = this.provider.toArray().length;
    if (this.currentFocusIndex === lengthResults - 1) return;
    this.currentFocusIndex++;
    this.focusElement(this.currentFocusIndex);
  }

  shiftFocusUp(e) {
    e.preventDefault();
    if (this.currentFocusIndex == 0) return;
    this.currentFocusIndex--;
    this.focusElement(this.currentFocusIndex);
  }

  escapeSearch(e) {
    this.termCustomer = "";
  }

  onChangeTermCustomer() {
    this.cdRef.detectChanges();
    // See this issue to know reason why I added that code
    // https://github.com/angular/angular/issues/17572
    this.currentFocusIndex = -1; // reset focus when typing new term
  }

  focusElement(id) {
    let listsButton = this.provider.toArray().map(res => res.nativeElement);
    if (id > listsButton.count || id < 0) {
      return;
    }
    listsButton.forEach(e => {
      this.renderer2.removeClass(e, "focus-customer");
    });
    this.renderer2.addClass(listsButton[id], "focus-customer");
    this.componentScroll.directiveRef.scrollToY(40 * id);
  }

  setFormValue(shop: any) {
    this.form.patchValue({
      name: shop.name,
      provider_id: shop.provider.id,
      address: shop.address,
      phone: shop.phone
    });
    this.url = shop.image;
    let selectedCustomer = this.provider.find(
      cus => cus.id === _.toNumber(shop.provider.id)
    );
    this.selectCustomer(selectedCustomer);
  }

  // * handle event keyup enter andn click customer
  selectCustomerEdit(cus: any) {
    this.customerSelected = cus;
    this.termCustomer = "";
  }
}
