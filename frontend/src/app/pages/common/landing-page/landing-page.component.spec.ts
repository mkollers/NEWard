import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '@shared/data-access/services/company.service';
import { NEVER, of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jasmine';
import { InjectorMock } from 'src/mocks/injector.mock';
import { instance, mock, when } from 'ts-mockito';

import { LandingPageComponent } from './landing-page.component';
import { CompanyMock } from '@shared/data-access/models/company.mock';

describe('LandingPageComponent', () => {

  it('should create', () => {
    // Arrange
    const companyServiceMock = mock<CompanyService>();
    const routeMock = mock<ActivatedRoute>();

    when(companyServiceMock.getAll()).thenReturn(NEVER);
    when(routeMock.data).thenReturn(NEVER);

    const route = instance(routeMock);
    const companyService = instance(companyServiceMock);
    const injector = InjectorMock.create([CompanyService, companyService], [ActivatedRoute, route]);

    // Act
    const component = new LandingPageComponent(injector);

    // Assert
    expect(component).toBeTruthy();
  });

  it('should merge route data and service result', marbles(m => {
    // Arrange
    const companyServiceMock = mock<CompanyService>();
    const routeMock = mock<ActivatedRoute>();

    when(companyServiceMock.getAll()).thenReturn(m.hot('--a--a|', { a: [] }));
    when(routeMock.data).thenReturn(m.cold('-a|', { a: { companies: []} }));

    const route = instance(routeMock);
    const companyService = instance(companyServiceMock);
    const injector = InjectorMock.create([CompanyService, companyService], [ActivatedRoute, route]);
    const expected$ = m.hot('-a---a|', { a: [] });

    // Act
    const component = new LandingPageComponent(injector);

    // Assert
    m.expect(component.companies$).toBeObservable(expected$);
  }));
});
