import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { ProductResolver } from './resolvers/product.resolver';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ProductPageRoutingModule
  ], providers: [
    ProductResolver
  ]
})
export class ProductPageModule { }
