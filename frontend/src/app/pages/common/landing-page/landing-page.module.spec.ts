import { LandingPageModule } from './landing-page.module';

describe('LandingPageModule', () => {
    it('should create', () => {
        // Act
        const module = new LandingPageModule();

        // Assert
        expect(module).toBeTruthy();
    });
});
