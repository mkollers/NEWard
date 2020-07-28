import { Injector } from '@angular/core';
import { AuthService } from '@shared/auth/services/auth.service';
import { Mock } from 'src/test-helper';

import { ProductMobileViewComponent } from './product-mobile-view.component';

describe('ProductMobileViewComponent', () => {
  let authService: Mock<AuthService>;
  let injector: Mock<Injector>;

  beforeEach(() => {
    authService = new Mock<AuthService>();
    injector = new Mock<Injector>();
  });

  it('should create', () => {
    // Act
    const component = new ProductMobileViewComponent(authService.instance, injector.instance);

    // Assert
    expect(component).toBeTruthy();
  });
});
