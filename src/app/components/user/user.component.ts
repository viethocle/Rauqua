import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../../models/user";
import { UserService } from "../../services/user/user.service";
import * as _ from "lodash";
import { BsModalComponent } from "ng2-bs3-modal";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

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
  user: any;
  role: any;
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    this.userService.getUser().subscribe(res => {
      this.users = res;
      console.log(this.users);
      this.dtTrigger.next();
    });
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
        role: ["", Validators.required]
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
          Validators.compose([Validators.required, Validators.minLength(9)])
        ],
        password: ["", Validators.minLength(8)],
        password_confirmation: [""],
        role: ["", Validators.required]
      },
      { validator: this.passwordConfirming }
    );
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
      console.log(res);
      this.users.push(res);
      console.log(this.users);
    });

    this.modal.close();
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
    this.userService.updateUser(value, this.user.id).subscribe(user => {
      _.assign(this.users.find(t => t.id === user.id), user);
      this.modalEdit.close()
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
