import { instance, mock, when } from 'ts-mockito';

import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  it('should create', () => {
    // Act
    const component = new ShellComponent(location);

    // Assert
    expect(component).toBeTruthy();
  });

  it('should return location href', () => {
    // Arrange
    const expected = 'http://neward.bodylife-medien.com/';
    const locationMock = mock(Location);
    when(locationMock.href).thenReturn(expected);
    const location = instance(locationMock);
    const component = new ShellComponent(location);

    // Act
    const result = component.getState();

    // Assert
    expect(result).toBe(expected);
  });
});
