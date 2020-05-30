import { HeaderService } from '@shared/layout/services/header.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('should create', () => {
    // Arrange
    const headerservice = new HeaderService();

    // Act
    const component = new HeaderComponent(headerservice);

    // Assert
    expect(component).toBeTruthy();
  });
});
