import { CompanyPageModule } from './company-page.module';

describe('CompanyPageModule', () => {
    it('should create', () => {
        // Act
        const module = new CompanyPageModule();

        // Assert
        expect(module).toBeTruthy();
    });
});
