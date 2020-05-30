import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'footer[neward-footer]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'neward-footer'
  }
})
export class FooterComponent { }
