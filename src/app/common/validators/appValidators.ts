import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class AppValidators {
  static checkFormatEmail(control: AbstractControl): ValidationErrors | null {
    // tslint:disable:max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (control.value.length > 0 && !emailRegex.test(control.value as string)) {
      return {
        isIncorrectFormat: true
      };
    }
    return null;
  }

  static checkSamePassword(formGroup: FormGroup) {
    const password = formGroup.controls.password.value;
    const rePassword = formGroup.controls.rePassword.value;
    return password === rePassword ? null : {notSamePassword: true};
  }
}
