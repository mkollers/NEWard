import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/data-access/models/product';

@Component({
  selector: 'neward-product-mobile-view, [neward-product-mobile-view]',
  templateUrl: './product-mobile-view.component.html',
  styleUrls: ['./product-mobile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductMobileViewComponent {
  @Input() product: Product | undefined;
  @Output() openOverlay = new EventEmitter<string>();
  @Output() signin = new EventEmitter<void>();
}
