import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninDialogComponent } from '@shared/auth/components/signin-dialog/signin-dialog.component';
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
    private _dialog: MatDialog,
    @Inject('WINDOW') private _window: Window,
    headerService: HeaderService
  ) {
    this.navigateBackUri$ = headerService.navigateBackUri$;
  }

  @HostListener('window:scroll')
  onWindowScroll = () => this.isSmall = this._window.pageYOffset > 48

  signin = () => {
    this._dialog.open(SigninDialogComponent, {
      disableClose: true,
      maxWidth: 'calc(100% - 32px)',
      panelClass: 'neward-overlay-pane',
      width: '450px'
    });
  }
}
