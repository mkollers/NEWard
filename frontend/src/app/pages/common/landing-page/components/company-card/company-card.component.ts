import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { Company } from '@shared/data-access/models/company';

@Component({
  selector: 'neward-company-card, [neward-company-card]',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-company-card'
  }
})
export class CompanyCardComponent {
  @Input() company: Company;
  @Input() token: Token;
}
