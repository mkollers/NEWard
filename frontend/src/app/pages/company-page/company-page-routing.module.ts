import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyPageComponent } from './company-page.component';
import { CompanyResolver } from './resolvers/company.resolver';

const routes: Routes = [
  { path: '', component: CompanyPageComponent, resolve: { company: CompanyResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyPageRoutingModule { }
