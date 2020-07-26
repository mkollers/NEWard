import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Token } from '@shared/auth/models/token';
import { AuthService } from '@shared/auth/services/auth.service';
import { Company } from '@shared/data-access/models/company';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'neward-company-mobile-view, [neward-company-mobile-view]',
  templateUrl: './company-mobile-view.component.html',
  styleUrls: ['./company-mobile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyMobileViewComponent {
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
    } catch (err) {
      console.error(err);
      // TODO
    }
  }
}
