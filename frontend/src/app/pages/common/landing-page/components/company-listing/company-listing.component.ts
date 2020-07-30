import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { Company } from '@shared/data-access/models/company';

@Component({
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('400ms cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ],
  selector: '[neward-company-listing]',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-company-listing'
  }
})
export class CompanyListingComponent {
  @Input() companies: Company[];
  @Input() token: Token;
}
