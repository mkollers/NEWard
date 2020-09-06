import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatisticsPageRoutingModule } from './statistics-page-routing.module';
import { StatisticsPageComponent } from './statistics-page.component';

@NgModule({
  declarations: [StatisticsPageComponent],
  imports: [
    CommonModule,
    StatisticsPageRoutingModule
  ]
})
export class StatsticsPageModule { }
