import { AppServerModule } from './app.server.module';

describe('AppServerModule', () => {
    it('should create', () => {
        // Act
        const app = new AppServerModule();

        // Assert
        expect(app).toBeTruthy();
    });
});
