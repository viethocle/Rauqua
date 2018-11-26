import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../../models/user";
import { UserService } from "../../services/user/user.service";
import * as _ from "lodash";
import { BsModalComponent } from "ng2-bs3-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild('modalEdit') modalEdit: BsModalComponent;
  form: FormGroup;
  formEdit: FormGroup;

  users: any[] = [];
  role: any;
  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

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
    this.form = this.fb.group(
      {
        email: [
          "",
          Validators.compose([Validators.email])
        ],
        name: ["", Validators.required],
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        password_confirmation: ["", Validators.required],
        role: []
      },
      { validator: this.passwordConfirming }
    );
    this.formEdit = this.fb.group({
      email:                  ["", Validators.email],
      name:                   ["", Validators.required], 
      password:               ["", Validators.compose([Validators.minLength(8)])],
      password_confirmation:  [""],
      role:                   ["", Validators.required]
    }, 
    { validator: this.passwordConfirming })
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
    console.log(value);
    this.modal.close();
  }
  
  openModalEdit(){
    this.modalEdit.open()
  }

  updateUser(value: any){

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
