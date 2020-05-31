import { HeaderService } from '@shared/layout/services/header.service';
import { instance, mock, when } from 'ts-mockito';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  it('should create', () => {
    // Arrange
    const headerservice = new HeaderService();

    // Act
    const component = new HeaderComponent(window, headerservice);

    // Assert
    expect(component).toBeTruthy();
  });

  describe('scoll animation', () => {
    for (const c of [{ offset: 49, result: true }, { offset: 48, result: false }]) {
      it(`set small to ${c.result}`, () => {
        // Arrange
        const headerservice = new HeaderService();
        const windowMock = mock(Window);
        when(windowMock.pageYOffset).thenReturn(c.offset);
        const component = new HeaderComponent(instance(windowMock), headerservice);

        // Act
        component.onWindowScroll();

        // Assert
        expect(component.isSmall).toBe(c.result);
      });
    }
  });
});
