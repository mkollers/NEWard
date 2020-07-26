import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SigninDialogComponent } from './components/signin-dialog/signin-dialog.component';
import { InitialsPipe } from './pipes/initials.pipe';
import { NameColorPipe } from './pipes/name-color.pipe';
import { ValidTokenPipe } from './pipes/valid-token.pipe';

@NgModule({
  declarations: [
    InitialsPipe,
    NameColorPipe,
    SigninDialogComponent,
    ValidTokenPipe
  ],
  exports: [
    InitialsPipe,
    NameColorPipe,
    SigninDialogComponent,
    ValidTokenPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class AuthModule { }
