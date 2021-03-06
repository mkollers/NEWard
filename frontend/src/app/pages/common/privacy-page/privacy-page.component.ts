import { ChangeDetectionStrategy, Component, HostBinding, Inject, INJECTOR, Injector } from '@angular/core';
import { BasePageComponent } from '@shared/helper/classes/base-page.component';
import { easeIn } from '@shared/layout/animations/ease-in.animation';

@Component({
  animations: [easeIn],
  selector: 'neward-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPageComponent extends BasePageComponent {
  @HostBinding('@easeIn') easeIn = true;

  constructor(@Inject(INJECTOR) protected injector: Injector) {
    super(injector);
    super.navigateBackUri = '/';
  }
}
