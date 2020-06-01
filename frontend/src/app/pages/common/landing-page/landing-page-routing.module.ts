import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
import { CompaniesResolver } from './resolvers/companies.resolver';

const routes: Routes = [
  { path: '', component: LandingPageComponent, resolve: { companies: CompaniesResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
