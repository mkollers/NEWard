import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { CompanyService } from '@shared/data-access/services/company.service';
import { ProductService } from '@shared/data-access/services/product.service';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RankingData } from './components/ranking-table/ranking-data';

@Component({
  selector: 'neward-statstics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsPageComponent {
  companyRanking$: Observable<RankingData[]>;
  productRanking$: Observable<RankingData[]>;
  tokens$: Observable<Token[]>;

  constructor(
    authService: AuthService,
    companyService: CompanyService,
    productService: ProductService
  ) {
    this.companyRanking$ = combineLatest([
      companyService.getAll(),
      authService.getTokens()
    ]).pipe(
      map(([companies, tokens]) => companies.map(c => ({
        name: c.legalName,
        points: sumBy(tokens, t => t.company_votes[c.id]),
        count: tokens.filter(t => t.company_votes[c.id]).length
      }))),
      map(rankings => rankings.map(ranking => ({ ...ranking, average: (ranking.points / ranking.count) }))),
      map(rankings => orderBy(rankings, r => r.points, 'desc'))
    );

    this.productRanking$ = combineLatest([
      productService.getAll(),
      authService.getTokens()
    ]).pipe(
      map(([products, tokens]) => products.map(p => ({
        name: `${p.name} (${p.manufacturer.legalName})`,
        points: sumBy(tokens, t => t.product_votes[p.id]),
        count: tokens.filter(t => t.product_votes[p.id]).length
      }))),
      map(rankings => rankings.map(ranking => ({ ...ranking, average: (ranking.points / ranking.count) }))),
      map(rankings => orderBy(rankings, r => r.points, 'desc'))
    );

    this.tokens$ = authService.getTokens();
  }
}
