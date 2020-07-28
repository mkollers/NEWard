import { Injector } from '@angular/core';
import { AuthService } from '@shared/auth/services/auth.service';
import { Mock } from 'src/test-helper';

import { ProductDesktopViewComponent } from './product-desktop-view.component';

describe('ProductDesktopViewComponent', () => {
  let authService: Mock<AuthService>;
  let injector: Mock<Injector>;

  beforeEach(() => {
    authService = new Mock<AuthService>();
    injector = new Mock<Injector>();
  });

  it('should create', () => {
    // Act
    const component = new ProductDesktopViewComponent(authService.instance, injector.instance);

    // Assert
    expect(component).toBeTruthy();
  });
});
