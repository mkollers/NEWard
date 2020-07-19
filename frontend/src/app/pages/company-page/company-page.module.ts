import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CompanyModule } from '@shared/company/company.module';
import { LayoutModule } from '@shared/layout/layout.module';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { CompanyPageRoutingModule } from './company-page-routing.module';
import { CompanyPageComponent } from './company-page.component';
import { CompanyDesktopViewComponent } from './components/company-desktop-view/company-desktop-view.component';
import { CompanyMobileViewComponent } from './components/company-mobile-view/company-mobile-view.component';
import { CompanyResolver } from './resolvers/company.resolver';
import { MatButtonModule } from '@angular/material/button';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: true,
  navigation: true,
  roundLengths: true
};

@NgModule({
  declarations: [
    CompanyDesktopViewComponent,
    CompanyMobileViewComponent,
    CompanyPageComponent
  ],
  imports: [
    CommonModule,
    CompanyPageRoutingModule,

    // Material
    MatButtonModule,
    MatDialogModule,

    // Custom
    CompanyModule,
    LayoutModule,
    SwiperModule
  ],
  providers: [
    CompanyResolver,
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }
  ]
})
export class CompanyPageModule { }
