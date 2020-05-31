import { PrivacyPageModule } from './privacy-page.module';

describe('PrivacyPageModule', () => {
    it('should create', () => {
        // Act
        const app = new PrivacyPageModule();

        // Assert
        expect(app).toBeTruthy();
    });
});
