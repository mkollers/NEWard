import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '@shared/layout/services/header.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'header[neward-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-header'
  }
})
export class HeaderComponent {
  navigateBackUri$: Observable<string | any[]>;

  constructor(headerService: HeaderService) {
    this.navigateBackUri$ = headerService.navigateBackUri$;
  }
}
