import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";
import { PromotionService } from "../../services/promotion/promotion.service";
import * as _ from "lodash";
import { BsModalComponent } from "ng2-bs3-modal";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastsManager } from "ng6-toastr";

@Component({
  selector: "app-promotion",
  templateUrl: "./promotion.component.html",
  styleUrls: ["./promotion.component.css"]
})
export class PromotionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  promotions: any[] = [];
  startDate = new Date().toISOString().split("T")[0];
  endDate = new Date().toISOString().split("T")[0];
  form: FormGroup;
  selectedFile: File = null;
  promotion: any;
  url: any =
    "https://image.freepik.com/free-photo/rows-of-colorful-energy-category_1156-662.jpg";

  constructor(
    private promotionService: PromotionService,
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
    this.getListPromotion();
  }

  buildForm() {
    this.form = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      percents: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required]
    });
  }

  getListPromotion() {
    this.promotionService.getPromotion().subscribe(res => {
      this.promotions = res;
      this.dtTrigger.next();
    });
  }

  openModalAddPromotion() {
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

  addPromotion() {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("name", this.form.value.name);
    formData.append("percents", this.form.value.percents);
    formData.append("start_date", this.startDate);
    formData.append("end_date", this.endDate);
    this.promotionService.addPromotion(formData).subscribe(res => {
      this.promotions.unshift(res);
      this.toastr.success("Đã tạo khuyến mãi thành công!");
      this.form.reset();
      this.modal.close();
    });
  }

  openModalEditPromotion(promotion: any){
    this.modalEdit.open()
    this.form.patchValue({
      name: promotion.name,
      persents: promotion.percents,
      start_date: promotion.start_date,
      end_date: promotion.end_date,
    });
    this.promotion = promotion;
  }

  editPromotion() {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("name", this.form.value.name);
    formData.append("percents", this.form.value.percents);
    formData.append("start_date", this.startDate);
    formData.append("end_date", this.endDate);
    this.promotionService.editPromotion(this.promotion.id, formData).subscribe(res => {
      this.toastr.success("Đã chỉnh sửa hàng thành công!");
      this.form.reset();
      this.modalEdit.close();
    });
  }

  deletePromotion(id: number) {
    this.promotionService.deletePromotion(id).subscribe(res => {
      this.promotions = _.reject(this.promotions, ["id", id]);
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
