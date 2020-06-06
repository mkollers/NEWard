import { ProductMock } from '@shared/data-access/models/product.mock';
import { ProductService } from '@shared/data-access/services/product.service';
import { of, throwError } from 'rxjs';
import { instance, mock } from 'ts-mockito';

import { ProductsResolver } from './products.resolver';

describe('ProductsResolver', () => {
    let productService: ProductService;
    let resolver: ProductsResolver;

    beforeEach(() => {
        const productServiceMock = mock<ProductService>();

        productService = instance(productServiceMock);
        resolver = new ProductsResolver(productService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should load products once', async () => {
        // Arrange
        const expected = [new ProductMock(), new ProductMock(), new ProductMock()];
        spyOn(productService, 'getAll').and.returnValue(of(expected));

        // Act
        const result = await resolver.resolve();

        // Assert
        expect(result).toEqual(expected);
    });

    it('should return null and log error', async () => {
        // Arrange
        const err = 'Hard disk rotates in the wrong direction';
        spyOn(productService, 'getAll').and.returnValue(throwError(err));
        spyOn(console, 'error').and.stub();

        // Act
        const result = await resolver.resolve();

        // Assert
        expect(result).toEqual(null);
        expect(console.error).toHaveBeenCalledWith(err);
    });
});
