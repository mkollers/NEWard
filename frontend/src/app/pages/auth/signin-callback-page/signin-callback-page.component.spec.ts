import { Injector } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/auth/services/auth.service';
import { Mock } from 'src/test-helper';
import { when } from 'ts-mockito';

import { SigninCallbackPageComponent } from './signin-callback-page.component';

describe('SigninCallbackPageComponent', () => {
  let injector: Mock<Injector>;
  let authService: Mock<AuthService>;
  let dialog: Mock<MatDialog>;
  let route: Mock<ActivatedRoute>;
  let router: Mock<Router>;
  let snackbar: Mock<MatSnackBar>;

  beforeEach(async(() => {
    injector = new Mock<Injector>();
    authService = new Mock<AuthService>();
    dialog = new Mock<MatDialog>();
    route = new Mock<ActivatedRoute>();
    router = new Mock<Router>();
    snackbar = new Mock<MatSnackBar>();

    when(injector.mock.get(AuthService)).thenReturn(authService.instance);
    when(injector.mock.get(MatDialog)).thenReturn(dialog.instance);
    when(injector.mock.get(ActivatedRoute)).thenReturn(route.instance);
    when(injector.mock.get(Router)).thenReturn(router.instance);
    when(injector.mock.get(MatSnackBar)).thenReturn(snackbar.instance);
  }));

  it('should create', () => {
    // Act
    const component = new SigninCallbackPageComponent(injector.instance);

    // Assert
    expect(component).toBeTruthy();
  });
});
