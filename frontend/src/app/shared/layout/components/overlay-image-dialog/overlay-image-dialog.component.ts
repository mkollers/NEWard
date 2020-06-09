import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'neward-overlay-image-dialog',
  templateUrl: './overlay-image-dialog.component.html',
  styleUrls: ['./overlay-image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayImageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OverlayImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string
  ) { }
}
