import { AuthService } from './../../../services/auth/auth.service';
import { AppValidators } from '../../../common/validators/appValidators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorCode: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        AppValidators.checkFormatEmail
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
        if (response && response.code == 200) {
          console.log("200:", response)
          const returnURL = this.route.snapshot.queryParamMap.get('returnURL');
          this.router.navigate([returnURL || '/']);
        }
      },
      err => {
        this.loginForm.setErrors({
          invalidLogin: err,
        });
      }
      );
  }
}
