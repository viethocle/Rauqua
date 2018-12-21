import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    // console.log(">>>", error);
    if (error == "Xin lỗi! Bạn chưa được cấp quyền cho thao tác này." || error.code == 500){
      alert(error);
    }
  }
}
