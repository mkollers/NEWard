import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { CompanyService } from '@shared/data-access/services/company.service';
import { ProductService } from '@shared/data-access/services/product.service';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'neward-statstics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsPageComponent {
  companyRanking$: Observable<{ name: string, points: number }[]>;
  productRanking$: Observable<{ name: string, points: number }[]>;
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
        points: sumBy(tokens, t => t.company_votes[c.id])
      }))),
      map(rankings => orderBy(rankings, r => r.points, 'desc'))
    );

    this.productRanking$ = combineLatest([
      productService.getAll(),
      authService.getTokens()
    ]).pipe(
      map(([products, tokens]) => products.map(p => ({
        name: `${p.name} (${p.manufacturer.legalName})`,
        points: sumBy(tokens, t => t.product_votes[p.id])
      }))),
      map(rankings => orderBy(rankings, r => r.points, 'desc'))
    );

    this.tokens$ = authService.getTokens();
  }
}
