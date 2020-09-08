import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AuthModule } from '@shared/auth/auth.module';
import { CompanyModule } from '@shared/company/company.module';
import { DataAccessModule } from '@shared/data-access/data-access.module';

import { RankingTableComponent } from './components/ranking-table/ranking-table.component';
import { VotesTableComponent } from './components/votes-table/votes-table.component';
import { StatisticsPageRoutingModule } from './statistics-page-routing.module';
import { StatisticsPageComponent } from './statistics-page.component';

@NgModule({
  declarations: [
    StatisticsPageComponent,
    RankingTableComponent,
    VotesTableComponent
  ],
  imports: [
    CommonModule,
    StatisticsPageRoutingModule,

    // Material
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,

    // Custom
    AuthModule,
    CompanyModule,
    DataAccessModule
  ]
})
export class StatsticsPageModule { }
