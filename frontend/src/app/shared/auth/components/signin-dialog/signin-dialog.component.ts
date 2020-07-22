import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@shared/auth/services/auth.service';

@Component({
  selector: 'neward-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninDialogComponent {
  fg: FormGroup;

  constructor(
    private _authService: AuthService,
    private _dialogRef: MatDialogRef<SigninDialogComponent>,
    private _snackbar: MatSnackBar,
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      email: fb.control(undefined, [Validators.email, Validators.required])
    });
  }

  submit = async (email: string) => {
    try {
      await this._authService.register(email);
      this._snackbar.open(`
      Wir haben Ihnen soeben einen Zugangslink an „${email}" gesendet.
      Bitte überprüfen Sie auch Ihren SPAM-Ordner, falls die Email nicht innerhalb von 10 Minuten erhalten haben.
      `);
      this._dialogRef.close();
    } catch (err) {
      console.error(err);
      const message = 'Hoppla, da ist etwas schief gelaufen...';
      this._snackbar.open(message, '', { duration: 10000 });
    }
  }
}
