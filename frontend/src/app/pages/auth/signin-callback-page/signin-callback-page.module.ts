import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SigninCallbackPageRoutingModule } from './signin-callback-page-routing.module';
import { SigninCallbackPageComponent } from './signin-callback-page.component';

@NgModule({
  declarations: [SigninCallbackPageComponent],
  imports: [
    CommonModule,
    SigninCallbackPageRoutingModule,

    // Material
    MatSnackBarModule
  ]
})
export class SigninCallbackPageModule { }
