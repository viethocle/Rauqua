import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorLabelComponent, ErrorMessagesPipe, InputFieldComponent } from './components/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalModule } from 'ng2-bs3-modal';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BsModalModule,
  ],
  declarations: [
    InputFieldComponent,
    ErrorLabelComponent,
    ErrorMessagesPipe,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ErrorLabelComponent,
    BsModalModule,
  ]
})
export class SharedModule { }
