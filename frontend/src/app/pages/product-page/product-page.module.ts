import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyModule } from '@shared/company/company.module';
import { LayoutModule } from '@shared/layout/layout.module';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { ProductResolver } from './resolvers/product.resolver';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: true,
  navigation: true,
  roundLengths: true
};

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ProductPageRoutingModule,

    // Material
    MatDialogModule,

    // Custom
    CompanyModule,
    LayoutModule,
    SwiperModule
  ], providers: [
    ProductResolver,
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }
  ]
})
export class ProductPageModule { }
