import { ActivatedRoute } from '@angular/router';
import { InjectorMock } from '@mocks/injector.mock';
import { ProductMock } from '@shared/data-access/models/product.mock';
import { ProductService } from '@shared/data-access/services/product.service';
import { HeaderService } from '@shared/layout/services/header.service';
import { NEVER } from 'rxjs';
import { marbles } from 'rxjs-marbles/jasmine';
import { anyString, instance, mock, when } from 'ts-mockito';

import { ProductPageComponent } from './product-page.component';

describe('ProductPageComponent', () => {
  let productServiceMock: ProductService;
  let routeMock: ActivatedRoute;
  let headerServiceMock: HeaderService;

  beforeEach(() => {
    headerServiceMock = mock<HeaderService>();
    productServiceMock = mock<ProductService>();
    routeMock = mock<ActivatedRoute>();
  });

  it('should create', () => {
    // Arrange
    when(productServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const route = instance(routeMock);
    const productService = instance(productServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create([HeaderService, headerService], [ProductService, productService], [ActivatedRoute, route]);

    // Act
    const component = new ProductPageComponent(injector);

    // Assert
    expect(component).toBeTruthy();
  });

  it('should merge route data and service result', marbles(m => {
    // Arrange
    const product = new ProductMock();
    when(productServiceMock.getById('42')).thenReturn(m.hot('--a--a|', { a: product }));
    when(routeMock.parent).thenReturn({ params: m.cold('a|', { a: { id: '42' } }) } as unknown as ActivatedRoute);
    when(routeMock.data).thenReturn(m.cold('-a|', { a: { product } }));

    const route = instance(routeMock);
    const productService = instance(productServiceMock);
    const headerService = instance(headerServiceMock);
    const injector = InjectorMock.create([HeaderService, headerService], [ProductService, productService], [ActivatedRoute, route]);
    const expected$ = m.hot('-a---a|', { a: product });

    // Act
    const component = new ProductPageComponent(injector);

    // Assert
    m.expect(component.product$).toBeObservable(expected$);
  }));
});
