import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'neward-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-shell'
  }
})
export class ShellComponent { }
