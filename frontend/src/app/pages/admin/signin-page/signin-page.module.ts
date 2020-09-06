import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SigninPageRoutingModule } from './signin-page-routing.module';
import { SigninPageComponent } from './signin-page.component';

@NgModule({
  declarations: [SigninPageComponent],
  imports: [
    CommonModule,
    SigninPageRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SigninPageModule { }
