import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject } from '@angular/core';
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

  constructor(
    @Inject('WINDOW') private _window: Window,
    headerService: HeaderService
  ) {
    this.navigateBackUri$ = headerService.navigateBackUri$;
  }

  @HostListener('window:scroll')
  onWindowScroll = () => this.isSmall = this._window.pageYOffset > 48
}
