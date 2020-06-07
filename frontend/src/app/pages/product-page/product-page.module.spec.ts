import { ProductPageModule } from './product-page.module';

describe('ProductPageModule', () => {
    it('should create', () => {
        // Act
        const module = new ProductPageModule();

        // Assert
        expect(module).toBeTruthy();
    });
});
