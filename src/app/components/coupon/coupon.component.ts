import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { CouponService } from "../../services/coupon/coupon.service";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastsManager } from "ng6-toastr";
import { BsModalComponent } from "ng2-bs3-modal";

@Component({
  selector: "app-coupon",
  templateUrl: "./coupon.component.html",
  styleUrls: ["./coupon.component.css"]
})
export class CouponComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  coupons: any[] = [];
  startDate = new Date().toISOString().split("T")[0];
  endDate = new Date().toISOString().split("T")[0];
  form: FormGroup;
  selectedFile: File = null;
  coupon: any;
  url: any =
    "https://image.freepik.com/free-photo/rows-of-colorful-energy-category_1156-662.jpg";

  constructor(
    private couponservice: CouponService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    this.buildForm();
    this.getListCoupon();
  }

  getListCoupon() {
    this.couponservice.getCoupon().subscribe(res => {
      this.coupons = res;
      this.dtTrigger.next();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      code: ["", Validators.compose([Validators.required])],
      percents: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      times: ["", Validators.required]
    });
  }
  openModalAddCoupon() {
    this.modal.open();
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

  addCoupon() {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("code", this.form.value.code);
    formData.append("percents", this.form.value.percents);
    formData.append("start_date", this.startDate);
    formData.append("end_date", this.endDate);
    formData.append("times", this.form.value.times);
    this.couponservice.addCoupon(formData).subscribe(res => {
      this.coupons.unshift(res);
      this.toastr.success("Đã tạo mã giảm giá thành công!");
      this.form.reset();
      this.modal.close();
    });
  }

  openModalEditCoupon(coupon: any) {
    this.modalEdit.open();
    this.form.patchValue({
      code: coupon.code,
      persents: coupon.percents,
      start_date: coupon.start_date,
      end_date: coupon.end_date,
      times: coupon.times
    });
    this.coupon = coupon;
  }

  editCoupon() {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("code", this.form.value.code);
    formData.append("percents", this.form.value.percents);
    formData.append("start_date", this.startDate);
    formData.append("end_date", this.endDate);
    formData.append("times", this.form.value.times);
    this.couponservice.editCoupon(this.coupon.id, formData).subscribe(res => {
      this.toastr.success("Đã chỉnh sửa mã giảm giá thành công!");
      this.form.reset();
      this.modalEdit.close();
    });
  }

  deleteCoupon(id: number) {
    this.couponservice.deleteCoupon(id).subscribe(res => {
      this.coupons = _.reject(this.coupons, ["id", id]);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
