import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/data-access/models/product';

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
}
