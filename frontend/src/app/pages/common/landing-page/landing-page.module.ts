import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { IntroComponent } from './components/intro/intro.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { CompaniesResolver } from './resolvers/companies.resolver';

@NgModule({
  declarations: [LandingPageComponent, IntroComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,

    // Material
    MatButtonModule
  ], providers: [
    CompaniesResolver
  ]
})
export class LandingPageModule { }
