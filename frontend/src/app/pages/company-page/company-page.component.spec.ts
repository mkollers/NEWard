import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InjectorMock } from '@mocks/injector.mock';
import { CompanyMock } from '@shared/data-access/models/company.mock';
import { CompanyService } from '@shared/data-access/services/company.service';
import { OverlayImageDialogComponent } from '@shared/layout/components/overlay-image-dialog/overlay-image-dialog.component';
import { HeaderService } from '@shared/layout/services/header.service';
import * as faker from 'faker';
import { NEVER } from 'rxjs';
import { marbles } from 'rxjs-marbles/jasmine';
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito';

import { CompanyPageComponent } from './company-page.component';

describe('CompanyPageComponent', () => {
  let breakpointObserverMock: BreakpointObserver;
  let companyServiceMock: CompanyService;
  let routeMock: ActivatedRoute;
  let headerServiceMock: HeaderService;

  beforeEach(() => {
    breakpointObserverMock = mock<BreakpointObserver>();
    headerServiceMock = mock<HeaderService>();
    companyServiceMock = mock<CompanyService>();
    routeMock = mock<ActivatedRoute>();
  });

  it('should create', () => {
    // Arrange
    when(breakpointObserverMock.observe(anything())).thenReturn(NEVER);
    when(companyServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const companyService = instance(companyServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create(
      [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [CompanyService, companyService], [ActivatedRoute, route]
    );

    // Act
    const component = new CompanyPageComponent(injector);

    // Assert
    expect(component).toBeTruthy();
  });

  it('should merge route data and service result', marbles(m => {
    // Arrange
    const company = new CompanyMock();
    when(breakpointObserverMock.observe(anything())).thenReturn(NEVER);
    when(companyServiceMock.getById('42')).thenReturn(m.hot('--a--a|', { a: company }));
    when(routeMock.parent).thenReturn({ params: m.cold('a|', { a: { id: '42' } }) } as unknown as ActivatedRoute);
    when(routeMock.data).thenReturn(m.cold('-a|', { a: { company } }));

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const companyService = instance(companyServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create(
      [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [CompanyService, companyService], [ActivatedRoute, route]
    );
    const expected$ = m.hot('-aa--a|', { a: company });

    // Act
    const component = new CompanyPageComponent(injector);

    // Assert
    m.expect(component.company$).toBeObservable(expected$);
  }));

  it('should toggle view mode', marbles(m => {
    // Arrange
    when(breakpointObserverMock.observe(anything())).thenReturn(m.hot('-sl-l-s|', {
      s: { matches: true } as unknown as BreakpointState,
      l: { matches: false } as unknown as BreakpointState
    }));
    when(companyServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const companyService = instance(companyServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create(
      [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [CompanyService, companyService], [ActivatedRoute, route]
    );
    const expected$ = m.hot<'mobile' | 'desktop'>('-sl---s|', {
      s: 'mobile',
      l: 'desktop'
    });

    // Act
    const component = new CompanyPageComponent(injector);

    // Assert
    m.expect(component.view$).toBeObservable(expected$);
  }));

  it('should open the image overlay', marbles(m => {
    // Arrange
    const matDialogMock = mock<MatDialog>();
    const url = faker.internet.url();
    when(breakpointObserverMock.observe(anything())).thenReturn(NEVER);
    when(companyServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const companyService = instance(companyServiceMock);
    const headerService = instance(headerServiceMock);
    const matDialog = instance(matDialogMock);
    const injector = InjectorMock.create(
      [MatDialog, matDialog], [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [CompanyService, companyService], [ActivatedRoute, route]
    );

    // Act
    const component = new CompanyPageComponent(injector);
    component.openOverlay(url);

    // Assert
    verify(matDialogMock.open(OverlayImageDialogComponent, anything())).called();
    expect().nothing();
  }));
});
