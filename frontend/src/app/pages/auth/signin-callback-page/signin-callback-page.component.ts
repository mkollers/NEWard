import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { AnalyticsService } from '@shared/tracing/services/analytics.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'neward-signin-callback-page',
  templateUrl: './signin-callback-page.component.html',
  styleUrls: ['./signin-callback-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninCallbackPageComponent {

  constructor(
    @Inject(Injector) private _injector: Injector
  ) {
    this._handleAccessToken();
  }

  private async _handleAccessToken() {
    const analyticsService = this._injector.get(AnalyticsService);
    const authService = this._injector.get(AuthService);
    const router = this._injector.get(Router);
    const snackbar = this._injector.get(MatSnackBar);

    const token = this._parseToken();
    const url = localStorage.getItem('redirect-uri') || '/';

    if (!token) {
      snackbar.open('Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '',
        { duration: 20000 }
      );
      analyticsService.gtag('event', 'open_signin_mail', {
        event_category: 'login',
        event_label: 'no_token_found'
      });
      router.navigateByUrl(url);
    }

    let data: Token | undefined;
    try {
      data = await authService.getByToken(token).pipe(first()).toPromise();
    } catch (err) {
      let msg = 'Es konnte kein gültiger Token gefunden werden. Wenn Sie mehrfach den Zugriff angefordert haben, verwenden Sie bitte den Link aus der neusten E-Mail. Sollte es weiterhin zu Problemen kommen lassen Sie sich eine neue E-Mail zuschicken.';
      switch (err.code) {
        case 'permission-denied':
          msg = 'Ihr Link ist leider abgelaufen. Bitte lassen Sie sich eine neue E-Mail zuschicken.';
          analyticsService.gtag('event', 'open_signin_mail', {
            event_category: 'login',
            event_label: 'token_expired'
          });
          break;
        default:
          analyticsService.gtag('event', 'open_signin_mail', {
            event_category: 'login',
            event_label: 'no_token_found'
          });
          break;
      }
      snackbar.open(msg, '', { duration: 20000 });
      router.navigateByUrl(url);
    }

    if (!data) {
      snackbar.open('Es konnte kein gültiger Token gefunden werden. Bitte lassen Sie sich eine neue E-Mail zuschicken.', '', {
        duration: 20000
      });
      analyticsService.gtag('event', 'open_signin_mail', {
        event_category: 'login',
        event_label: 'no_token_found'
      });
      router.navigateByUrl(url);
    }

    authService.token$ = authService.getByToken(token as string);
    router.navigateByUrl(url);
  }

  private _parseToken(): string {
    const route = this._injector.get(ActivatedRoute);

    let token = '';
    if (route.snapshot.queryParamMap.has('token')) {
      token = route.snapshot.queryParamMap.get('token') as string;
      localStorage.setItem('token', token);
    }
    return token;
  }
}
