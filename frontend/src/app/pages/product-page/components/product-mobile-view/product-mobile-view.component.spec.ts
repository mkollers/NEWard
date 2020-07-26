import { AuthService } from '@shared/auth/services/auth.service';
import { instance, mock } from 'ts-mockito';

import { ProductMobileViewComponent } from './product-mobile-view.component';

describe('ProductMobileViewComponent', () => {
  let authServiceMock: AuthService;
  let authService: AuthService;

  beforeEach(() => {
    authServiceMock = mock<AuthService>();
    authService = instance(authServiceMock);
  });

  it('should create', () => {
    // Act
    const component = new ProductMobileViewComponent(authService);

    // Assert
    expect(component).toBeTruthy();
  });
});
