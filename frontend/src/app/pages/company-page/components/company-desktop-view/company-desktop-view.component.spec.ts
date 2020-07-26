import { AuthService } from '@shared/auth/services/auth.service';
import { instance, mock } from 'ts-mockito';

import { CompanyDesktopViewComponent } from './company-desktop-view.component';

describe('CompanyDesktopViewComponent', () => {
  let authServiceMock: AuthService;
  let authService: AuthService;

  beforeEach(() => {
    authServiceMock = mock<AuthService>();
    authService = instance(authServiceMock);
  });

  it('should create', () => {
    // Act
    const component = new CompanyDesktopViewComponent(authService);

    // Assert
    expect(component).toBeTruthy();
  });
});
