import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  SigninDescriptionDialogComponent
} from './components/signin-description-dialog/signin-description-dialog.component';
import { SigninCallbackPageRoutingModule } from './signin-callback-page-routing.module';
import { SigninCallbackPageComponent } from './signin-callback-page.component';

@NgModule({
  declarations: [SigninCallbackPageComponent, SigninDescriptionDialogComponent],
  imports: [
    CommonModule,
    SigninCallbackPageRoutingModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class SigninCallbackPageModule { }
