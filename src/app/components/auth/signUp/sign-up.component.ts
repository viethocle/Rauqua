import { AppValidators } from '../../../common/validators/appValidators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ),
      email: new FormControl('',
        [
          Validators.required,
          AppValidators.checkFormatEmail
        ]
      ),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ),
      rePassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      )
    }, { validators: AppValidators.checkSamePassword});
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get rePassword() {
    return this.signUpForm.get('rePassowrd');
  }

  change(username) { console.log(username); }

}
