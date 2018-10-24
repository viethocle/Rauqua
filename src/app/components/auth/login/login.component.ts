import { AuthService } from './../../../services/auth/auth.service';
import { EmailValidators } from './../../../common/validators/email.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorCode: String;
  constructor(private authService: AuthService, private router: Router) { }

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
    this.authService.login(parameters)
      .subscribe(response => {
        if (response.isOk) {
          this.router.navigate(['/']);
        } else {
          this.loginForm.setErrors({
            invalidLogin: response.error.code,
          });
        }
      });
  }
}
