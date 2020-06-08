import { ChangeDetectionStrategy, Component, Inject, INJECTOR, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/data-access/models/product';
import { ProductService } from '@shared/data-access/services/product.service';
import { BasePageComponent } from '@shared/helper/classes/base-page.component';
import { merge, Observable, of } from 'rxjs';
import { map, skip, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

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
  selectedImage: string;

  constructor(
    @Inject(INJECTOR) private _injector: Injector
  ) {
    super(_injector);
    super.navigateBackUri = '/';

    this.product$ = this._createProductQuery();
  }

  openOverlay(image: string) {
    const dialog = this._injector.get(MatDialog);
    this.selectedImage = image;

    // const overlay = dialog.open(OverlayImageDialogComponent, {
    //   data: image,
    //   panelClass: 'image-overlay',
    //   maxHeight: '90vH',
    //   maxWidth: '90vW'
    // });
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
      switchMap(id => service.getById(id)),
      skip(1)
    );
    return merge(product$, hotProduct$);
  }
}
