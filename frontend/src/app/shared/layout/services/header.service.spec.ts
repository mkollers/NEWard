import { HeaderService } from './header.service';

describe('HeaderService', () => {

  it('should be created', () => {
    // Act
    const service = new HeaderService();

    // Assert
    expect(service).toBeTruthy();
  });

  describe('navigate back properties', () => {
    it('should return value of navigate back behavior subject', () => {
      // Arrange
      const service = new HeaderService();

      // Assert
      expect(service.navigateBackUri).toEqual(service.navigateBackUri$.value);
    });

    it('should set navigate back behavior subject', () => {
      // Arrange
      const service = new HeaderService();

      // Act
      service.navigateBackUri = '/movie-quotes/i-see-dead-people';

      // Assert
      expect(service.navigateBackUri$.value).toEqual('/movie-quotes/i-see-dead-people');
    });
  });
});
