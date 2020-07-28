import { AnalyticsService } from '@shared/tracing/services/analytics.service';
import { Mock } from 'src/test-helper';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let analyticsService: Mock<AnalyticsService>;

  beforeEach(() => {
    analyticsService = new Mock<AnalyticsService>();
  });

  it('should create the app', () => {
    // Act
    const component = new AppComponent(analyticsService.instance);

    // Assert
    expect(component).toBeTruthy();
  });
});
