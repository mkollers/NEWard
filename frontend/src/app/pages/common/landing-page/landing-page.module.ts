import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CompanyCardComponent } from './components/company-card/company-card.component';
import { CompanyListingComponent } from './components/company-listing/company-listing.component';
import { IntroComponent } from './components/intro/intro.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { CompaniesResolver } from './resolvers/companies.resolver';
import { ProductsResolver } from './resolvers/products.resolver';

@NgModule({
  declarations: [
    CompanyCardComponent,
    CompanyListingComponent,
    IntroComponent,
    LandingPageComponent,
    ProductListingComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,

    // Material
    MatButtonModule
  ], providers: [
    CompaniesResolver,
    ProductsResolver
  ]
})
export class LandingPageModule { }
