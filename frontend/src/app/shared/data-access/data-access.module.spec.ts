import { DataAccessModule } from './data-access.module';

describe('DataAccessModule', () => {
    it('should create', () => {
        // Act
        const module = new DataAccessModule();

        // Assert
        expect(module).toBeTruthy();
    });
});
