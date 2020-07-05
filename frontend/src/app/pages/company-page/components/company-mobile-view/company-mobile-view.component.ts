import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '@shared/data-access/models/company';

@Component({
  selector: 'neward-company-mobile-view, [neward-company-mobile-view]',
  templateUrl: './company-mobile-view.component.html',
  styleUrls: ['./company-mobile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyMobileViewComponent {
  @Input() company: Company | undefined;
  @Output() openOverlay = new EventEmitter<string>();
}
