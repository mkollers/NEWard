import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Company } from '@shared/data-access/models/company';

@Component({
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
}
