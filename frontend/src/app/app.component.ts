import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnalyticsService } from '@shared/tracing/services/analytics.service';

@Component({
  selector: 'neward-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(analyticsService: AnalyticsService) {
    analyticsService.enable();
  }
}
