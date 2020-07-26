import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { Product } from '@shared/data-access/models/product';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'neward-product-desktop-view, [neward-product-desktop-view]',
  templateUrl: './product-desktop-view.component.html',
  styleUrls: ['./product-desktop-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDesktopViewComponent {
  @Input() product: Product;
  @Output() openOverlay = new EventEmitter<string>();
  @Output() signin = new EventEmitter<void>();
  token$: Observable<Token | undefined>;

  constructor(private _authService: AuthService) {
    this.token$ = _authService.token$;
  }

  async vote(product: Product, points: number) {
    try {
      const token = await this.token$.pipe(first()).toPromise();
      if (!token) {
        console.error('This should not happen! Token not found');
        return;
      }
      await this._authService.voteForProduct(token.key, product.id, points);
      (window as any).ga('send', 'event', 'vote', 'vote_for_product', product.name);
    } catch (err) {
      console.error(err);
      // TODO
    }
  }
}
