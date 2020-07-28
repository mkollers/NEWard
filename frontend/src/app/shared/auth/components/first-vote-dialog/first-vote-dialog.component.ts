import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'neward-first-vote-dialog',
  templateUrl: './first-vote-dialog.component.html',
  styleUrls: ['./first-vote-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstVoteDialogComponent {
}
