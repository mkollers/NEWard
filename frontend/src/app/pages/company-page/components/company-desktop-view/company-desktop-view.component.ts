import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { Company } from '@shared/data-access/models/company';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'neward-company-desktop-view, [neward-company-desktop-view]',
  templateUrl: './company-desktop-view.component.html',
  styleUrls: ['./company-desktop-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDesktopViewComponent {
  @Input() company: Company;
  @Output() openOverlay = new EventEmitter<string>();
  @Output() signin = new EventEmitter<void>();
  token$: Observable<Token | undefined>;

  constructor(private _authService: AuthService) {
    this.token$ = _authService.token$;
  }

  async vote(company: Company, points: number) {
    try {
      const token = await this.token$.pipe(first()).toPromise();
      if (!token) {
        console.error('This should not happen! Token not found');
        return;
      }
      await this._authService.voteForCompany(token.key, company.id, points);
      (window as any).ga('send', 'event', 'vote', 'vote_for_company', company.legalName);
    } catch (err) {
      console.error(err);
      // TODO
    }
  }
}
