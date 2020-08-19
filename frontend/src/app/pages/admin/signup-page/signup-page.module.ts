import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupPageRoutingModule } from './signup-page-routing.module';
import { SignupPageComponent } from './signup-page.component';


@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    SignupPageRoutingModule
  ]
})
export class SignupPageModule { }
