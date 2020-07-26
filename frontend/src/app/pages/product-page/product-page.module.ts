import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AuthModule } from '@shared/auth/auth.module';
import { CompanyModule } from '@shared/company/company.module';
import { HelperModule } from '@shared/helper/helper.module';
import { LayoutModule } from '@shared/layout/layout.module';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { ProductDesktopViewComponent } from './components/product-desktop-view/product-desktop-view.component';
import { ProductMobileViewComponent } from './components/product-mobile-view/product-mobile-view.component';
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
  declarations: [ProductPageComponent, ProductDesktopViewComponent, ProductMobileViewComponent],
  imports: [
    CommonModule,
    ProductPageRoutingModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,

    // Custom
    AuthModule,
    CompanyModule,
    HelperModule,
    LayoutModule,
    SwiperModule
  ], providers: [
    ProductResolver,
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }
  ]
})
export class ProductPageModule { }
