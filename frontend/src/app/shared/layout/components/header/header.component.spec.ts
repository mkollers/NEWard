import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from '@shared/layout/services/header.service';
import { instance, mock, when } from 'ts-mockito';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let dialogMock: MatDialog;

  beforeEach(() => {
    dialogMock = mock<MatDialog>();
  });

  it('should create', () => {
    // Arrange
    const headerservice = new HeaderService();
    const matDialog = instance(dialogMock);

    // Act
    const component = new HeaderComponent(matDialog, window, headerservice);

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
        const component = new HeaderComponent(matDialog, instance(windowMock), headerservice);

        // Act
        component.onWindowScroll();

        // Assert
        expect(component.isSmall).toBe(c.result);
      });
    }
  });
});
