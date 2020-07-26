import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '@shared/auth/services/auth.service';
import { Product } from '@shared/data-access/models/product';
import { Observable } from 'rxjs';
import { Token } from '@shared/auth/models/token';
import { auth } from 'firebase';

@Component({
  selector: 'neward-product-desktop-view, [neward-product-desktop-view]',
  templateUrl: './product-desktop-view.component.html',
  styleUrls: ['./product-desktop-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDesktopViewComponent {
  @Input() product: Product | undefined;
  @Output() openOverlay = new EventEmitter<string>();
  @Output() signin = new EventEmitter<void>();
  token$: Observable<Token | undefined>;

  constructor(authService: AuthService) {
    this.token$ = authService.token$;
  }
}
