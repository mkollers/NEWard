import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Inject, INJECTOR, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SigninDialogComponent } from '@shared/auth/components/signin-dialog/signin-dialog.component';
import { Product } from '@shared/data-access/models/product';
import { ProductService } from '@shared/data-access/services/product.service';
import { BasePageComponent } from '@shared/helper/classes/base-page.component';
import { OverlayImageDialogComponent } from '@shared/layout/components/overlay-image-dialog/overlay-image-dialog.component';
import { merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'neward-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-product-page'
  }
})
export class ProductPageComponent extends BasePageComponent {
  product$: Observable<Product | null>;
  view$: Observable<'mobile' | 'desktop'>;

  constructor(@Inject(INJECTOR) private _injector: Injector) {
    super(_injector);
    this.navigateBackUri = '/';
    this.fragment = 'produktneuheiten-des-jahres';

    this.product$ = this._createProductQuery();
    this.view$ = this._createViewQuery();
  }

  openOverlay(image: string) {
    const dialog = this._injector.get(MatDialog);

    dialog.open(OverlayImageDialogComponent, {
      data: image,
      panelClass: 'image-overlay',
      maxHeight: '90vH',
      maxWidth: '90vW'
    });
  }

  signin = () => {
    const dialog = this.injector.get(MatDialog);
    dialog.open(SigninDialogComponent, {
      disableClose: true,
      maxWidth: 'calc(100% - 32px)',
      panelClass: 'neward-overlay-pane',
      width: '450px'
    });
  }

  private _createViewQuery = () => {
    const breakpointObserver = this.injector.get(BreakpointObserver);

    return breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
      map(state => state.matches),
      distinctUntilChanged(),
      map(matches => matches ? 'mobile' : 'desktop')
    );
  }

  private _createProductQuery = () => {
    const service = this._injector.get(ProductService);
    const route = this._injector.get(ActivatedRoute);

    if (!route.parent) {
      return of(null);
    }
    const productId$ = route.parent.params.pipe(map(params => params.id));
    const product$: Observable<Product | null> = route.data.pipe(map(data => data.product));
    const hotProduct$ = productId$.pipe(
      switchMap(id => service.getById(id))
    );
    return merge(product$, hotProduct$);
  }
}
