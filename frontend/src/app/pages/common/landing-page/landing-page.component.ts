import { ChangeDetectionStrategy, Component, Inject, INJECTOR, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '@shared/data-access/models/company';
import { CompanyService } from '@shared/data-access/services/company.service';
import { BasePageComponent } from '@shared/helper/classes/base-page.component';
import { merge, Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';

@Component({
  selector: 'neward-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent extends BasePageComponent {
  companies$: Observable<Company[]>;

  constructor(@Inject(INJECTOR) private _injector: Injector) {
    super(_injector);

    this.companies$ = this._createCompaniesQuery();
  }

  private _createCompaniesQuery = () => {
    const service = this._injector.get(CompanyService);
    const route = this._injector.get(ActivatedRoute);
    const companies$ = route.data.pipe(map(data => data.companies));
    const hotCompanies$ = service.getAll().pipe(skip(1));
    return merge(companies$, hotCompanies$);
  }
}
