import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidators {
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
}
