import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Company } from '@shared/data-access/models/company';

@Component({
  selector: 'neward-contact, [neward-contact]',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-contact'
  }
})
export class ContactComponent {
  @Input() company: Company;
}
