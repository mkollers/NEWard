import { ViewportScroller } from '@angular/common';
import { Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@shared/auth/services/auth.service';
import { CompanyService } from '@shared/data-access/services/company.service';
import { ProductService } from '@shared/data-access/services/product.service';
import { NEVER } from 'rxjs';
import { marbles } from 'rxjs-marbles/jasmine';
import { Mock } from 'src/test-helper';
import { when } from 'ts-mockito';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let authService: Mock<AuthService>;
  let companyService: Mock<CompanyService>;
  let injector: Mock<Injector>;
  let productService: Mock<ProductService>;
  let route: Mock<ActivatedRoute>;
  let viewportScroller: Mock<ViewportScroller>;

  beforeEach(() => {
    authService = new Mock<AuthService>();
    companyService = new Mock<CompanyService>();
    injector = new Mock<Injector>();
    productService = new Mock<ProductService>();
    route = new Mock<ActivatedRoute>();
    viewportScroller = new Mock<ViewportScroller>();

    when(injector.mock.get(AuthService)).thenReturn(authService.instance);
    when(injector.mock.get(CompanyService)).thenReturn(companyService.instance);
    when(injector.mock.get(ProductService)).thenReturn(productService.instance);
    when(injector.mock.get(ActivatedRoute)).thenReturn(route.instance);
    when(injector.mock.get(ViewportScroller)).thenReturn(viewportScroller.instance);

    when(route.mock.fragment).thenReturn(NEVER);
  });

  it('should create', () => {
    // Arrange
    when(companyService.mock.getAll()).thenReturn(NEVER);
    when(productService.mock.getAll()).thenReturn(NEVER);
    when(route.mock.data).thenReturn(NEVER);

    // Act
    const component = new LandingPageComponent(injector.instance);

    // Assert
    expect(component).toBeTruthy();
  });

  it('should merge route data and service result', marbles(m => {
    // Arrange
    when(companyService.mock.getAll()).thenReturn(m.hot('--a--a|', { a: [] }));
    when(productService.mock.getAll()).thenReturn(m.hot('--a--a|', { a: [] }));
    when(route.mock.data).thenReturn(m.cold('-a|', { a: { companies: [], products: [] } }));
    const expected$ = m.hot('-aa--a|', { a: [] });

    // Act
    const component = new LandingPageComponent(injector.instance);

    // Assert
    m.expect(component.companies$).toBeObservable(expected$);
    m.expect(component.products$).toBeObservable(expected$);
  }));
});
