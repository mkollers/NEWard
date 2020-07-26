import { AuthService } from '@shared/auth/services/auth.service';
import { instance, mock } from 'ts-mockito';

import { ProductDesktopViewComponent } from './product-desktop-view.component';

describe('ProductDesktopViewComponent', () => {
  let authServiceMock: AuthService;
  let authService: AuthService;

  beforeEach(() => {
    authServiceMock = mock<AuthService>();
    authService = instance(authServiceMock);
  });

  it('should create', () => {
    // Act
    const component = new ProductDesktopViewComponent(authService);

    // Assert
    expect(component).toBeTruthy();
  });
});
