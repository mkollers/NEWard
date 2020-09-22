import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'neward-ask-for-participate-dialog',
  templateUrl: './ask-for-participate-dialog.component.html',
  styleUrls: ['./ask-for-participate-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AskForParticipateDialogComponent {

  constructor(
    private _dialogRef: MatDialogRef<AskForParticipateDialogComponent>
  ) {
  }

  close = async (value: boolean) => {
    this._dialogRef.close(value);
  }

}
