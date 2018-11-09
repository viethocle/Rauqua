import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({ name: "errorMessages" })
export class ErrorMessagesPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: Object): Array<string> {
    if (Array.isArray(value)) {
      return value;
    }

    return this.parseErrorObject(value);
  }

  private parseErrorObject(value: Object): Array<string> {
    let errors = [];
    for (const key in value) {
      if (this.knownErrors()[key]) {
        const error_messages = this.knownErrors()[key].call(this, value[key]);
        errors = errors.concat(error_messages);
      }
    }
    return errors;
  }

  private knownErrors(): Object {
    return {
      pattern: this.patternError,
      minlength: this.minLengthError,
      maxlength: this.maxLengthError,
      min: this.minValueError,
      email: this.emailNotCorrect,
      required: this.requiredError,
      full_messages: this.fullMessages,
      cannotContainSpace: this.cannotContainSpace,
      passwordShouldBeMatched: this.shouldBeMatched,
      emailTaken: this.existingEmail,
      codeTaken: this.existingCodeProduct
    };
  }

  private existingCodeProduct(_error): string {
    return this.translate.instant("Mã sản phẩm này đã được sử dụng. Vui lòng chọn mã khác!");
  }

  private shouldBeMatched(_error): string {
    return this.translate.instant("Mật khẩu không khớp");
  }

  private existingEmail(_error): string {
    return this.translate.instant("Email này đã tồn tại, vui lòng chọn email khác");
  }

  private emailNotCorrect(_error): string {
    return this.translate.instant("Email không chính xác");
  }

  private cannotContainSpace(_error): string {
    return this.translate.instant("Phần nhập này không được chứa khoảng trắng");
  }

  private minValueError(error): string {
    return this.translate.instant("Giá trị cần phải lớn hơn", {
      value: error["min"]
    });
  }

  private patternError(error): string {
    return `Must match /${error["requiredPattern"]}/ pattern`;
  }

  private maxLengthError(error): string {
    return `Độ dài không được quá ${error["requiredLength"] + 1} ký tự`
  }

  private minLengthError(error): string {
    return `Độ dài phải nhiều hơn ${error["requiredLength"] - 1} ký tự`
  }

  private requiredError(_error): string {
    return this.translate.instant("Phần nhập bắt buộc");
  }

  private fullMessages(error): Array<string> {
    return error;
  }
}
