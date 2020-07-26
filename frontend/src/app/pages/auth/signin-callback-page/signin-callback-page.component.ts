import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'neward-signin-callback-page',
  templateUrl: './signin-callback-page.component.html',
  styleUrls: ['./signin-callback-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninCallbackPageComponent {

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    this._handleAccessToken();
  }

  private async _handleAccessToken() {
    const token = this._parseToken(this._route.snapshot.queryParamMap);
    const url = localStorage.getItem('redirect-uri') || '/';

    if (!token) {
      this._snackbar.open('Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '',
        { duration: 20000 }
      );
      (window as any).ga('send', 'event', 'no_token_found');
      this._router.navigateByUrl(url);
    }

    let data: Token | undefined;
    try {
      data = await this._authService.getByToken(token as string).pipe(
        first()
      ).toPromise();
    } catch (err) {
      let msg = 'Es konnte kein gültiger Token gefunden werden. Wenn Sie mehrfach den Zugriff angefordert haben, verwenden Sie bitte den Link aus der neusten E-Mail. Sollte es weiterhin zu Problemen kommen lassen Sie sich eine neue E-Mail zuschicken.';
      switch (err.code) {
        case 'permission-denied':
          msg = 'Ihr Link ist leider abgelaufen. Bitte lassen Sie sich eine neue E-Mail zuschicken.';
          (window as any).ga('send', 'event', 'token_expired');
          break;
        default:
          (window as any).ga('send', 'event', 'no_token_found');
          break;
      }
      this._snackbar.open(msg, '', { duration: 20000 });
      this._router.navigateByUrl(url);
    }

    if (!data) {
      this._snackbar.open('Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '', {
        duration: 20000
      });
      (window as any).ga('send', 'event', 'no_token_found');
      this._router.navigateByUrl(url);
    }

    this._authService.token$ = this._authService.getByToken(token as string);
    this._router.navigateByUrl(url);
  }

  private _parseToken(params: ParamMap): string | null {
    if (params.has('token')) {
      localStorage.setItem('token', params.get('token') as string);
    }
    return localStorage.getItem('token');
  }
}
