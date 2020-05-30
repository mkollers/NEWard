import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
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
  @HostBinding('class.small') isSmall = false;
  navigateBackUri$: Observable<string | any[]>;

  constructor(headerService: HeaderService) {
    this.navigateBackUri$ = headerService.navigateBackUri$;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 64) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
  }
}
