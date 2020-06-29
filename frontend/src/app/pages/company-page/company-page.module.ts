import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompanyPageRoutingModule } from './company-page-routing.module';
import { CompanyPageComponent } from './company-page.component';
import { CompanyResolver } from './resolvers/company.resolver';

@NgModule({
  declarations: [CompanyPageComponent],
  imports: [
    CommonModule,
    CompanyPageRoutingModule
  ],
  providers: [
    CompanyResolver
  ]
})
export class CompanyPageModule { }
