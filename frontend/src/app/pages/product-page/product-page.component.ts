import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'neward-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent { }
