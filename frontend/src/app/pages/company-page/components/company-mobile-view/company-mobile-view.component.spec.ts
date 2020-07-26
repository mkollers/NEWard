import { AuthService } from '@shared/auth/services/auth.service';
import { instance, mock } from 'ts-mockito';

import { CompanyMobileViewComponent } from './company-mobile-view.component';

describe('CompanyMobileViewComponent', () => {
  let authServiceMock: AuthService;
  let authService: AuthService;

  beforeEach(() => {
    authServiceMock = mock<AuthService>();
    authService = instance(authServiceMock);
  });

  it('should create', () => {
    // Act
    const component = new CompanyMobileViewComponent(authService);

    // Assert
    expect(component).toBeTruthy();
  });
});
