import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../../models/user";
import { UserService } from "../../services/user/user.service";
import * as _ from "lodash";
import { BsModalComponent } from "ng2-bs3-modal";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { ToastsManager } from "ng6-toastr";
import { CodegenComponentFactoryResolver } from "@angular/core/src/linker/component_factory_resolver";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  formAdd: FormGroup;
  formEdit: FormGroup;

  users: any[] = [];
  userAddIsMod: number = 0;
  user: any;
  role: any;
  resources: any;
  controls: any;
  contents: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.buildForm();

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    this.userService.getUser().subscribe(res => {
      this.users = res;
      this.dtTrigger.next();
    });
    this.contents = this.formAdd.get("role_resources") as FormArray;
  }

  buildForm() {
    this.formAdd = this.fb.group(
      {
        email: ["", Validators.compose([Validators.email])],
        username: ["", Validators.required],
        fullname: ["", Validators.required],
        address: ["", Validators.required],
        phone: [
          "",
          Validators.compose([Validators.required, Validators.minLength(9)])
        ],
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        password_confirmation: ["", Validators.required],
        role: ["", Validators.required],
        role_resources: this.fb.array([])
      },
      { validator: this.passwordConfirming }
    );

    this.formEdit = this.fb.group(
      {
        email: ["", Validators.compose([Validators.email])],
        username: ["", Validators.required],
        fullname: ["", Validators.required],
        address: ["", Validators.required],
        phone: [
          "",
          Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
        ],
        password: ["", Validators.minLength(8)],
        password_confirmation: [""],
        role: ["", Validators.required]
      },
      { validator: this.passwordConfirming }
    );
  }
  createContent(id: any): FormGroup {
    return this.fb.group({
      resource_id: id,
      can_view: true,
      can_add: true,
      can_edit: true,
      can_del: false,
    });
  }

  passwordConfirming(c: AbstractControl) {
    if (c.get("password").value !== c.get("password_confirmation").value) {
      return { passwordShouldBeMatched: true };
    }
    return null;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(res => {
      this.users = _.reject(this.users, ["id", id]);
    });
  }

  addUser(value: any) {
    this.userService.createUser(value).subscribe(res => {
      this.users.unshift(res);
      this.toastr.success("Tạo mới thành công!");
      this.backAddUser()
    },
      err => {
        this.toastr.error("Đã xảy ra lỗi: ", err);
      });

    this.modal.close();
  }

  editMode() {
    this.userAddIsMod = 1;
    if (this.contents.value.length == 0){
      this.userService.getResource().subscribe(res => {
        this.resources = res;
        
        this.resources.forEach(resource => {
          this.contents.push(this.createContent(resource.id));
        });
      });
    }
   
  }

  backAddUser() {
    this.userAddIsMod = 0;
  }

  openModalEdit(user: any) {
    this.formEdit.reset();
    this.formEdit.patchValue({
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      phone: user.phone,
      address: user.address,
      role: user.role
    });
    this.user = user;
    this.modalEdit.open();
  }

  updateUser(value: any) {
    value = _.pickBy(value);
    this.userService.updateUser(value, this.user.id).subscribe(
      user => {
        _.assign(this.users.find(t => t.id === user.id), user);
        this.toastr.success("Cập nhật thành công!");
        this.modalEdit.close();
      },
      err => {
        this.toastr.error("Đã xảy ra lỗi", err);
      }
    );
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
