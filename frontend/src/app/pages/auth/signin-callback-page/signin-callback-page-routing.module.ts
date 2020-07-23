import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninCallbackPageComponent } from './signin-callback-page.component';

const routes: Routes = [
  { path: '', component: SigninCallbackPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninCallbackPageRoutingModule { }
