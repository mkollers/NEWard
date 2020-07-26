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

import { CompanyPageRoutingModule } from './company-page-routing.module';
import { CompanyPageComponent } from './company-page.component';
import { CompanyDesktopViewComponent } from './components/company-desktop-view/company-desktop-view.component';
import { CompanyMobileViewComponent } from './components/company-mobile-view/company-mobile-view.component';
import { CompanyResolver } from './resolvers/company.resolver';

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
    MatMenuModule,

    // Custom
    AuthModule,
    CompanyModule,
    HelperModule,
    LayoutModule,
    SwiperModule
  ],
  providers: [
    CompanyResolver,
    { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }
  ]
})
export class CompanyPageModule { }
