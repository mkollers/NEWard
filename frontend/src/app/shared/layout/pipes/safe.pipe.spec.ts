import { DomSanitizer } from '@angular/platform-browser';
import * as faker from 'faker';
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito';

import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let pipe: SafePipe;
  let sanitizerMock: DomSanitizer;

  beforeEach(() => {
    sanitizerMock = mock<DomSanitizer>();
    when(sanitizerMock.bypassSecurityTrustHtml(anyString())).thenReturn('');
    when(sanitizerMock.bypassSecurityTrustStyle(anyString())).thenReturn('');
    when(sanitizerMock.bypassSecurityTrustScript(anyString())).thenReturn('');
    when(sanitizerMock.bypassSecurityTrustUrl(anyString())).thenReturn('');
    when(sanitizerMock.bypassSecurityTrustResourceUrl(anything())).thenReturn('');

    const sanitizer = instance(sanitizerMock);
    pipe = new SafePipe(sanitizer);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should make expected call HTML', () => {
      // Arrange
      const value = faker.hacker.abbreviation();

      // Act
      pipe.transform(value, 'html');

      // Assert
      verify(sanitizerMock.bypassSecurityTrustHtml(value)).once();
      expect().nothing();
    });

    it('should make expected call STYLE', () => {
      // Arrange
      const value = faker.hacker.abbreviation();

      // Act
      pipe.transform(value, 'style');

      // Assert
      verify(sanitizerMock.bypassSecurityTrustStyle(value)).once();
      expect().nothing();
    });

    it('should make expected call SCRIPT', () => {
      // Arrange
      const value = faker.hacker.abbreviation();

      // Act
      pipe.transform(value, 'script');

      // Assert
      verify(sanitizerMock.bypassSecurityTrustScript(value)).once();
      expect().nothing();
    });

    it('should make expected call URL', () => {
      // Arrange
      const value = faker.hacker.abbreviation();

      // Act
      pipe.transform(value, 'url');

      // Assert
      verify(sanitizerMock.bypassSecurityTrustUrl(value)).once();
      expect().nothing();
    });

    it('should make expected call resourceURL', () => {
      // Arrange
      const value = faker.hacker.abbreviation();

      // Act
      pipe.transform(value, 'resourceUrl');

      // Assert
      verify(sanitizerMock.bypassSecurityTrustResourceUrl(value)).once();
      expect().nothing();
    });

    it('should make expected call default', () => {
      // Arrange
      const type = 'Schnitzel';

      // Act & Assert
      try {
        pipe.transform('', type);
      } catch (err) {
        expect(err).toEqual(new Error(`Invalid safe type specified: ${type}`));
      }
    });
  });
});
