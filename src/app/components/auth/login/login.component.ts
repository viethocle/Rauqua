import { AuthService } from './../../../services/auth/auth.service';
import { EmailValidators } from './../../../common/validators/email.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        EmailValidators.checkFormatEmail
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  change(email) { console.log(email); }

  submit() {
    const parameters = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    this.authService.login(parameters).subscribe(response => {
      const data = JSON.parse(response['_body']);
      if (data && data.isOk) {
        console.log('Success');
      } else {
        console.log('fail', data.error.code);
      }
    });
    // this.loginForm.setErrors({
    //   isLoginError: true
    // });
  }
}
