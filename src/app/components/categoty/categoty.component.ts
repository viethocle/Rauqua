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
// import 'jquery';
// import 'bootstrap';

@Component({
  selector: "app-categoty",
  templateUrl: "./categoty.component.html",
  styleUrls: ["./categoty.component.css"]
})
export class CategotyComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categories: Category[] = [];
  form: FormGroup;
  selectedFile: File = null;
  url: any  = "https://image.freepik.com/free-photo/rows-of-colorful-energy-category_1156-662.jpg";
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

  createCategory() {
    const formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    formData.append("name", this.form.value.name);
    formData.append("parent_id", "0");
    this.categoryService.addCategory(formData).subscribe(res => {
      this.categories.unshift(res);
      this.toastr.success("Đã tạo cửa hàng thành công!");
      this.form.reset();
      this.modal.close();
    });
  }
}
