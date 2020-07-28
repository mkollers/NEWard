import { Injector } from '@angular/core';
import { AuthService } from '@shared/auth/services/auth.service';
import { Mock } from 'src/test-helper';

import { CompanyDesktopViewComponent } from './company-desktop-view.component';

describe('CompanyDesktopViewComponent', () => {
  let authService: Mock<AuthService>;
  let injector: Mock<Injector>;

  beforeEach(() => {
    authService = new Mock<AuthService>();
    injector = new Mock<Injector>();
  });

  it('should create', () => {
    // Act
    const component = new CompanyDesktopViewComponent(authService.instance, injector.instance);

    // Assert
    expect(component).toBeTruthy();
  });
});
