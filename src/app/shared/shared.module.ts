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

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, BsModalModule, TranslateModule],
  declarations: [InputFieldComponent, ErrorLabelComponent, ErrorMessagesPipe, MySearchPipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ErrorLabelComponent,
    BsModalModule,
    TranslateModule
  ]
})
export class SharedModule {}
