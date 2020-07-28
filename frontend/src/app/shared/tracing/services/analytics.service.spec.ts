import { NavigationEnd, Router } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { Mock } from 'src/test-helper';
import { instance, mock, when } from 'ts-mockito';

import { AnalyticsService, GstWindow } from './analytics.service';

describe('AnalyticsService', () => {
  let router: Mock<Router>;
  let window: Mock<GstWindow>;

  beforeEach(() => {
    router = new Mock<Router>();
    window = new Mock<GstWindow>();
  });

  it('should be created', () => {
    // Act
    const service = new AnalyticsService(router.instance, window.instance);

    // Assert
    expect(service).toBeTruthy();
  });

  describe(`- ${AnalyticsService.prototype.enable.name}() -`, () => {
    let script: HTMLScriptElement;

    beforeEach(() => {
      const bodyMock = mock<HTMLBodyElement>();
      const body = instance(bodyMock);

      const scriptMock = mock<HTMLScriptElement>();
      script = instance(scriptMock);

      const documentMock = mock<HTMLDocument>();
      when(documentMock.body).thenReturn(body);
      when(documentMock.createElement('script')).thenReturn(script);
      const document = instance(documentMock);

      when(window.mock.document).thenReturn(document);
    });

    it('should inject google tagmanager script', () => {
      // Arrange
      when(router.mock.events).thenReturn(EMPTY);
      window.instance.dataLayer = undefined;
      spyOn(window.instance.document.body, 'appendChild').and.stub();
      const service = new AnalyticsService(router.instance, window.instance);

      // Act
      service.enable();

      // Assert
      expect(script.src).toBe(`https://www.googletagmanager.com/gtag/js?id=UA-122158272-9`);
      expect(window.instance.document.body.appendChild).toHaveBeenCalledWith(script);
    });

    it('should track page view on navigation end', () => {
      // Arrange
      const sub = new Subject<NavigationEnd>();
      when(router.mock.events).thenReturn(sub);
      window.instance.dataLayer = [];
      const service = new AnalyticsService(router.instance, window.instance);

      // Act
      service.enable();
      spyOn(window.instance, 'gtag').and.stub();
      sub.next(new NavigationEnd(0, '', '/i-love-cookies'));

      // Assert
      expect(window.instance.gtag).toHaveBeenCalledWith('config', 'UA-122158272-9', {
        page_path: '/i-love-cookies'
      });
    });
  });

  describe(`- ${AnalyticsService.prototype.gtag.name}() -`, () => {
    it('should do nothing because of disabled via config or not enabled before', () => {
      // Arrange
      when(window.mock.gtag).thenReturn(undefined as any);
      const service = new AnalyticsService(router.instance, window.instance);

      // Act
      service.gtag();

      // Assert
      expect().nothing(); // no exception should be thrown
    });
  });
});
