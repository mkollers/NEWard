import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InjectorMock } from '@mocks/injector.mock';
import { ProductMock } from '@shared/data-access/models/product.mock';
import { ProductService } from '@shared/data-access/services/product.service';
import { OverlayImageDialogComponent } from '@shared/layout/components/overlay-image-dialog/overlay-image-dialog.component';
import { HeaderService } from '@shared/layout/services/header.service';
import * as faker from 'faker';
import { NEVER, Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles/jasmine';
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito';

import { ProductPageComponent } from './product-page.component';

describe('ProductPageComponent', () => {
  let breakpointObserverMock: BreakpointObserver;
  let productServiceMock: ProductService;
  let routeMock: ActivatedRoute;
  let headerServiceMock: HeaderService;

  beforeEach(() => {
    breakpointObserverMock = mock<BreakpointObserver>();
    headerServiceMock = mock<HeaderService>();
    productServiceMock = mock<ProductService>();
    routeMock = mock<ActivatedRoute>();
  });

  it('should create', () => {
    // Arrange
    when(breakpointObserverMock.observe(anything())).thenReturn(NEVER);
    when(productServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const productService = instance(productServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create(
      [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [ProductService, productService], [ActivatedRoute, route]
    );

    // Act
    const component = new ProductPageComponent(injector);

    // Assert
    expect(component).toBeTruthy();
  });

  it('should merge route data and service result', marbles(m => {
    // Arrange
    const product = new ProductMock();
    when(breakpointObserverMock.observe(anything())).thenReturn(NEVER);
    when(productServiceMock.getById('42')).thenReturn(m.hot('--a--a|', { a: product }));
    when(routeMock.parent).thenReturn({ params: m.cold('a|', { a: { id: '42' } }) } as unknown as ActivatedRoute);
    when(routeMock.data).thenReturn(m.cold('-a|', { a: { product } }));

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const productService = instance(productServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create(
      [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [ProductService, productService], [ActivatedRoute, route]
    );
    const expected$ = m.hot('-aa--a|', { a: product });

    // Act
    const component = new ProductPageComponent(injector);

    // Assert
    m.expect(component.product$).toBeObservable(expected$);
  }));

  it('should toggle view mode', marbles(m => {
    // Arrange
    when(breakpointObserverMock.observe(anything())).thenReturn(m.hot('-sl-l-s|', {
      s: { matches: true } as unknown as BreakpointState,
      l: { matches: false } as unknown as BreakpointState
    }));
    when(productServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const productService = instance(productServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create(
      [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [ProductService, productService], [ActivatedRoute, route]
    );
    const expected$ = m.hot<'mobile' | 'desktop'>('-sl---s|', {
      s: 'mobile',
      l: 'desktop'
    });

    // Act
    const component = new ProductPageComponent(injector);

    // Assert
    m.expect(component.view$).toBeObservable(expected$);
  }));

  it('should open the image overlay', marbles(m => {
    // Arrange
    const matDialogMock = mock<MatDialog>();
    const url = faker.internet.url();
    when(breakpointObserverMock.observe(anything())).thenReturn(NEVER);
    when(productServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const breakpointObserver = instance(breakpointObserverMock);
    const route = instance(routeMock);
    const productService = instance(productServiceMock);
    const headerService = instance(headerServiceMock);
    const matDialog = instance(matDialogMock);
    const injector = InjectorMock.create(
      [MatDialog, matDialog], [BreakpointObserver, breakpointObserver], [HeaderService, headerService],
      [ProductService, productService], [ActivatedRoute, route]
    );

    // Act
    const component = new ProductPageComponent(injector);
    component.openOverlay(url);

    // Assert
    verify(matDialogMock.open(OverlayImageDialogComponent, anything())).called();
    expect().nothing();
  }));
});
