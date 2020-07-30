import { animateChild, query, stagger, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, INJECTOR, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { Company } from '@shared/data-access/models/company';
import { Product } from '@shared/data-access/models/product';
import { CompanyService } from '@shared/data-access/services/company.service';
import { ProductService } from '@shared/data-access/services/product.service';
import { BasePageComponent } from '@shared/helper/classes/base-page.component';
import { easeIn } from '@shared/layout/animations/ease-in.animation';
import { merge, Observable } from 'rxjs';
import { delay, map, takeWhile, tap } from 'rxjs/operators';

@Component({
  animations: [
    easeIn,
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(160, animateChild()), { optional: true })
      ])
    ])
  ],
  selector: 'neward-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent extends BasePageComponent {
  companies$: Observable<Company[]>;
  products$: Observable<Product[]>;
  token$: Observable<Token | undefined>;

  constructor(@Inject(INJECTOR) private _injector: Injector) {
    super(_injector);

    this.companies$ = this._createCompaniesQuery();
    this.products$ = this._createProductsQuery();
    this.token$ = this._createTokenQuery();
    this._handleFragments();
  }

  private _handleFragments() {
    const route = this.injector.get(ActivatedRoute);
    const viewportScroller = this.injector.get(ViewportScroller);

    route.fragment.pipe(
      takeWhile(() => this.alive),
      delay(1),
      tap(frag => viewportScroller.scrollToAnchor(frag))
    ).subscribe();
  }

  private _createCompaniesQuery = () => {
    const service = this._injector.get(CompanyService);
    const route = this._injector.get(ActivatedRoute);
    const companies$ = route.data.pipe(map(data => data.companies));
    const hotCompanies$ = service.getAll();
    return merge(companies$, hotCompanies$);
  }

  private _createProductsQuery = () => {
    const service = this._injector.get(ProductService);
    const route = this._injector.get(ActivatedRoute);
    const products$ = route.data.pipe(map(data => data.products));
    const hotProducts$ = service.getAll();
    return merge(products$, hotProducts$);
  }

  private _createTokenQuery = () => {
    const service = this.injector.get(AuthService);
    return service.token$;
  }
}
