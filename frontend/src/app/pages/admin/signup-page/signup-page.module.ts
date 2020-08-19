import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SignupPageRoutingModule } from './signup-page-routing.module';
import { SignupPageComponent } from './signup-page.component';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    SignupPageRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SignupPageModule { }
