import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '@shared/data-access/models/company';

@Component({
  selector: 'neward-company-desktop-view, [neward-company-desktop-view]',
  templateUrl: './company-desktop-view.component.html',
  styleUrls: ['./company-desktop-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDesktopViewComponent {
  @Input() company: Company | undefined;
  @Output() openOverlay = new EventEmitter<string>();
}
