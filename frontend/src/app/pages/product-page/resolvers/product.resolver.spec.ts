import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductMock } from '@shared/data-access/models/product.mock';
import { ProductService } from '@shared/data-access/services/product.service';
import { of, throwError } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { ProductResolver } from './product.resolver';

describe('ProductResolver', () => {
    let productService: ProductService;
    let resolver: ProductResolver;
    let routeMock: ActivatedRouteSnapshot;

    beforeEach(() => {
        const productServiceMock = mock<ProductService>();
        routeMock = mock<ActivatedRouteSnapshot>();
        when(routeMock.parent).thenReturn({ params: { id: '42' } } as unknown as ActivatedRouteSnapshot);

        productService = instance(productServiceMock);
        resolver = new ProductResolver(productService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should load the product once', async () => {
        // Arrange
        const expected = new ProductMock();
        spyOn(productService, 'getById').and.returnValue(of(expected));
        when(routeMock.parent).thenReturn({ params: { id: '42' } } as unknown as ActivatedRouteSnapshot);
        const route = instance(routeMock);

        // Act
        const result = await resolver.resolve(route);

        // Assert
        expect(productService.getById).toHaveBeenCalledWith('42');
        expect(result).toEqual(expected);
    });

    it('should return null because of missing id', async () => {
        // Arrange
        when(routeMock.parent).thenReturn(null as unknown as ActivatedRouteSnapshot);
        const route = instance(routeMock);

        // Act
        const result = await resolver.resolve(route);

        // Assert
        expect(result).toEqual(null);
    });

    it('should return null and log error', async () => {
        // Arrange
        const err = 'Hard disk rotates in the wrong direction';
        spyOn(productService, 'getById').and.returnValue(throwError(err));
        spyOn(console, 'error').and.stub();
        when(routeMock.parent).thenReturn({ params: { id: '42' } } as unknown as ActivatedRouteSnapshot);
        const route = instance(routeMock);

        // Act
        const result = await resolver.resolve(route);

        // Assert
        expect(result).toEqual(null);
        expect(console.error).toHaveBeenCalledWith(err);
    });
});
