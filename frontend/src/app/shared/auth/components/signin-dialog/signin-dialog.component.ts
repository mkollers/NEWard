import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'neward-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninDialogComponent {
  fg: FormGroup;

  constructor(
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      email: fb.control(undefined, [Validators.email, Validators.required])
    });
  }

  submit = (email: string) => console.log(email);
}
