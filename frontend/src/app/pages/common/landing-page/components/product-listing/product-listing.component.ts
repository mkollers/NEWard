import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { Product } from '@shared/data-access/models/product';

@Component({
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('400ms cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ],
  selector: '[neward-product-listing]',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-product-listing'
  }
})
export class ProductListingComponent {
  @Input() products: Product[];
  @Input() token: Token;
}
