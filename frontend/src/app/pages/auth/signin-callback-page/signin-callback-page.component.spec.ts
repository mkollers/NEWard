import { async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/auth/services/auth.service';
import { instance, mock } from 'ts-mockito';

import { SigninCallbackPageComponent } from './signin-callback-page.component';

describe('SigninCallbackPageComponent', () => {
  let authServiceMock: AuthService;
  let routeMock: ActivatedRoute;
  let routerMock: Router;
  let snackbarMock: MatSnackBar;

  beforeEach(async(() => {
    authServiceMock = mock<AuthService>();
    routeMock = mock<ActivatedRoute>();
    routerMock = mock<Router>();
    snackbarMock = mock<MatSnackBar>();
  }));

  it('should create', () => {
    // Arrange
    const authService = instance(authServiceMock);
    const route = instance(routeMock);
    const router = instance(routerMock);
    const snackbar = instance(snackbarMock);

    // Act
    const component = new SigninCallbackPageComponent(authService, route, router, snackbar);

    // Assert
    expect(component).toBeTruthy();
  });
});
