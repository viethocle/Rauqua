import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";
import { CategoryService } from "../../services/category/category.service";
import { Category } from "../../models/category";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";
import * as _ from "lodash";
import { BsModalComponent } from "ng2-bs3-modal";
import { ToastsManager } from "ng6-toastr";
import { log } from "util";
// import 'jquery';
// import 'bootstrap';

@Component({
  selector: "app-categoty",
  templateUrl: "./categoty.component.html",
  styleUrls: ["./categoty.component.css"]
})
export class CategotyComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  @ViewChild("modalDetail") modalDetail: BsModalComponent;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categories: Category[] = [];
  form: FormGroup;
  selectedFile: File = null;
  categoryDetail: any;
  currentCategory: any;
  url: any =
    "https://image.freepik.com/free-photo/rows-of-colorful-energy-category_1156-662.jpg";
  category: any;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit(): void {
    this.buildForm();
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };
    this.categoryService.getCategory().subscribe(res => {
      this.categories = res;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      position: ["", Validators.compose([Validators.required])],
      parent_id: 0
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(res => {
      this.categories = _.reject(this.categories, ["id", id]);
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

  openModalCreate() {
    this.modal.open();
  }

  createCategory() {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("name", this.form.value.name);
    formData.append("position", this.form.value.position);
    if (this.currentCategory != null) {
      formData.append("parent_id", this.currentCategory.id);
    } else{
      formData.append("parent_id", this.form.value.parent_id);
    }
    
    this.categoryService.addCategory(formData).subscribe(res => {
      this.categories.unshift(res);
      this.toastr.success("Đã tạo cửa hàng thành công!");
      this.form.reset();
      this.modal.close();
    });
  }

  openModalEdit(category: any) {
    this.form.reset();
    this.form.patchValue({
      name: category.name,
      position: category.position,
      parent_id: category.parent_id
    });
    this.category = category;
    this.modalEdit.open();
  }

  editCategory() {
    this.categoryService
      .editCategory(this.category.id, this.form.value)
      .subscribe(res => {
        this.category.name = this.form.value.name;
        this.category.position = this.form.value.position;
        _.assign(
          this.categories.find(t => t.id === this.category.id.id),
          this.category
        );
        this.toastr.success("Cập nhật thành công!");
        this.modalEdit.close();
      });
  }

  openModalDetail(category: any) {
    this.currentCategory = category
    this.modalDetail.open();
    this.categoryService.getListCategoryChildren(category.id).subscribe(res => {
      this.categoryDetail = res.children;
    });
  }

  openMocalCategoryChildren() {
    this.modalDetail.close();
    this.openModalCreate();
  }

  openModalEditChildren(category: any) {
    this.modalDetail.close();
    this.openModalEdit(category);
  }
}
