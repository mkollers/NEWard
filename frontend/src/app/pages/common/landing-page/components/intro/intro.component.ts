import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'neward-intro, [neward-intro]',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroComponent { }
