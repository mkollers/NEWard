import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
import { CompaniesResolver } from './resolvers/companies.resolver';
import { ProductsResolver } from './resolvers/products.resolver';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    resolve: { companies: CompaniesResolver, products: ProductsResolver }, runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
