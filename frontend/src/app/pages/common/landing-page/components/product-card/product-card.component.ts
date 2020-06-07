import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@shared/data-access/models/product';

@Component({
  selector: 'neward-product-card, [neward-product-card]',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-product-card'
  }
})
export class ProductCardComponent {
  @Input() product: Product;
}
