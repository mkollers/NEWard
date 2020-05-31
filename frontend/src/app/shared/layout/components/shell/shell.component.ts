import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { easeInAnimation } from '@shared/layout/animations/ease-in.animation';

@Component({
  animations: [easeInAnimation],
  selector: 'neward-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-shell'
  }
})
export class ShellComponent {
  constructor(@Inject('LOCATION') private _location: Location) { }

  getState = () => this._location.href;
}
