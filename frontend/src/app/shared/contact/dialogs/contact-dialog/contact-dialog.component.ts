import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@shared/auth/services/auth.service';
import { defaultIfEmpty, first, startWith } from 'rxjs/operators';

@Component({
  selector: 'neward-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDialogComponent {
  fg: FormGroup;
  submitting = false;

  constructor(
    private _authService: AuthService,
    private _dialogRef: MatDialogRef<ContactDialogComponent>,
    private _fb: FormBuilder
  ) {
    this.fg = this._fb.group({
      message: this._fb.control(''),
      email: this._fb.control('', [Validators.email, Validators.required]),
      familyName: this._fb.control(''),
      givenName: this._fb.control('')
    });
    this._setEmail();
  }

  private async _setEmail() {
    const token = await this._authService.token$.pipe(defaultIfEmpty(), first()).toPromise();
    this.fg.controls.email.setValue(token?.email);
  }

  submit = async (value: { email: string, givenName: string, familyName: string, message: string }) => {
    if (this.submitting) return;

    this._dialogRef.close(value);
    this.submitting = false;
  }

}
