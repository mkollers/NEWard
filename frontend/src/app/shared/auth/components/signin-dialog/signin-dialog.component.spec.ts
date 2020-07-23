import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@shared/auth/services/auth.service';
import { instance, mock } from 'ts-mockito';

import { SigninDialogComponent } from './signin-dialog.component';

describe('SigninDialogComponent', () => {
  let authServiceMock: AuthService;
  let dialogRefMock: MatDialogRef<SigninDialogComponent>;
  let snackbarMock: MatSnackBar;

  beforeEach(() => {
    authServiceMock = mock<AuthService>();
    dialogRefMock = mock<MatDialogRef<SigninDialogComponent>>();
    snackbarMock = mock<MatSnackBar>();
  });

  it('should create', () => {
    // Arrange
    const authService = instance(authServiceMock);
    const dialogRef = instance(dialogRefMock);
    const snackbar = instance(snackbarMock);

    // Act
    const component = new SigninDialogComponent(authService, dialogRef, snackbar, new FormBuilder());

    // Assert
    expect(component).toBeTruthy();
  });
});
