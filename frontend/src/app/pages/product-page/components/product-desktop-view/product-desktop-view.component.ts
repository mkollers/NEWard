import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Injector, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirstVoteDialogComponent } from '@shared/auth/components/first-vote-dialog/first-vote-dialog.component';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { Product } from '@shared/data-access/models/product';
import { AnalyticsService } from '@shared/tracing/services/analytics.service';
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

  constructor(
    private _authService: AuthService,
    @Inject(Injector) private _injector: Injector
  ) {
    this.token$ = _authService.token$;
  }

  async vote(product: Product, points: number) {
    try {
      const analyticsService = this._injector.get(AnalyticsService);

      const token = await this.token$.pipe(first()).toPromise();
      if (!token) {
        console.error('This should not happen! Token not found');
        return;
      }
      await this._authService.voteForProduct(token.key, product.id, points);
      analyticsService.gtag('event', 'vote', {
        event_label: 'vote_for_product',
        product: product.name
      });

      const votedCompanies = Object.keys(token.company_votes).length;
      const votedProducts = Object.keys(token.product_votes).length;
      if (votedCompanies + votedProducts === 0) {
        const dialog = this._injector.get(MatDialog);
        dialog.open(FirstVoteDialogComponent, {
          disableClose: true,
          maxWidth: 'calc(100% - 32px)',
          panelClass: 'neward-overlay-pane',
          width: '450px'
        });
      }
    } catch (err) {
      console.error(err);
      const snackbar = this._injector.get(MatSnackBar);
      snackbar.open('Hoppla, da ist leider etwas schief gegangen...');
    }
  }
}
