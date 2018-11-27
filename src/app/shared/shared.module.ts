import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core';

import {
  ErrorLabelComponent,
  ErrorMessagesPipe,
  InputFieldComponent
} from "./components/";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsModalModule } from "ng2-bs3-modal";
import { MySearchPipe } from './pipes/my-search.pipe';
import { ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';


@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, BsModalModule, TranslateModule,ToastModule.forRoot()],
  declarations: [InputFieldComponent, ErrorLabelComponent, ErrorMessagesPipe, MySearchPipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ErrorLabelComponent,
    BsModalModule,
    TranslateModule,
  ]
})
export class SharedModule {}
