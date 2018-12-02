import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from '@ngx-translate/core';
import { FilterPipeModule } from 'ngx-filter-pipe';

import {
  ErrorLabelComponent,
  ErrorMessagesPipe,
  InputFieldComponent
} from "./components/";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsModalModule } from "ng2-bs3-modal";
import { MySearchPipe } from './pipes/my-search.pipe';
import { ToastModule, ToastOptions } from 'ng6-toastr/ng2-toastr';
import { Ng2SearchPipe } from "ng2-search-filter";


@NgModule({
  declarations: [InputFieldComponent, ErrorLabelComponent, ErrorMessagesPipe, MySearchPipe],
  imports: [FormsModule, CommonModule, ReactiveFormsModule, BsModalModule, TranslateModule,ToastModule.forRoot()],
  exports: [
    FormsModule,
    FilterPipeModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ErrorLabelComponent,
    BsModalModule,
    TranslateModule,
    MySearchPipe
  ],
  providers:[
    Ng2SearchPipe,
  ]
})
export class SharedModule {}
