import { ChangeDetectionStrategy, Component, Inject, INJECTOR, Injector } from '@angular/core';
import { BasePageComponent } from '@shared/helper/classes/base-page.component';

@Component({
  selector: 'neward-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPageComponent extends BasePageComponent {

  constructor(@Inject(INJECTOR) protected injector: Injector) {
    super(injector);
    super.navigateBackUri = '/';
  }
}
