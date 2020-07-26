import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@shared/auth/services/auth.service';
import { HeaderService } from '@shared/layout/services/header.service';
import { instance, mock, when } from 'ts-mockito';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let authServiceMock: AuthService;
  let authService: AuthService;
  let dialogMock: MatDialog;

  beforeEach(() => {
    authServiceMock = mock<AuthService>();
    dialogMock = mock<MatDialog>();

    authService = instance(authServiceMock);
  });

  it('should create', () => {
    // Arrange
    const headerservice = new HeaderService();
    const matDialog = instance(dialogMock);

    // Act
    const component = new HeaderComponent(matDialog, window, authService, headerservice);

    // Assert
    expect(component).toBeTruthy();
  });

  describe('scroll animation', () => {
    for (const c of [{ offset: 49, result: true }, { offset: 48, result: false }]) {
      it(`set small to ${c.result}`, () => {
        // Arrange
        const headerservice = new HeaderService();
        const matDialog = instance(dialogMock);
        const windowMock = mock(Window);
        when(windowMock.pageYOffset).thenReturn(c.offset);
        const component = new HeaderComponent(matDialog, instance(windowMock), authService, headerservice);

        // Act
        component.onWindowScroll();

        // Assert
        expect(component.isSmall).toBe(c.result);
      });
    }
  });
});
