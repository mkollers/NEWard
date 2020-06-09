import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InjectorMock } from '@mocks/injector.mock';
import { ProductMock } from '@shared/data-access/models/product.mock';
import { ProductService } from '@shared/data-access/services/product.service';
import { OverlayImageDialogComponent } from '@shared/layout/components/overlay-image-dialog/overlay-image-dialog.component';
import { HeaderService } from '@shared/layout/services/header.service';
import * as faker from 'faker';
import { NEVER } from 'rxjs';
import { marbles } from 'rxjs-marbles/jasmine';
import { anyString, instance, mock, verify, when, anything } from 'ts-mockito';

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
    const expected$ = m.hot('-aa--a|', { a: product });

    // Act
    const component = new ProductPageComponent(injector);

    // Assert
    m.expect(component.product$).toBeObservable(expected$);
  }));

  it('should open the image overlay', marbles(m => {
    // Arrange
    const matDialogMock = mock<MatDialog>();
    const url = faker.internet.url();
    when(productServiceMock.getById(anyString())).thenReturn(NEVER);
    when(routeMock.parent).thenReturn(null);
    when(routeMock.data).thenReturn(NEVER);

    const route = instance(routeMock);
    const productService = instance(productServiceMock);
    const headerService = instance(headerServiceMock);
    const matDialog = instance(matDialogMock);
    const injector = InjectorMock.create(
      [MatDialog, matDialog], [HeaderService, headerService], [ProductService, productService], [ActivatedRoute, route]
    );

    // Act
    const component = new ProductPageComponent(injector);
    component.openOverlay(url);

    // Assert
    verify(matDialogMock.open(OverlayImageDialogComponent, anything())).called();
    expect().nothing();
  }));
});
