import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@shared/auth/services/auth.service';

import { MatchValidator } from './validators/match-validator';

@Component({
  selector: 'neward-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent {
  fg: FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _snackbar: MatSnackBar,
    private _router: Router,
    title: Title
  ) {
    title.setTitle('Admin-Konto erstellen');
    this._initFormGroups();
  }

  async submit() {
    try {
      const email: string = this.fg.value.email;
      const password: string = this.fg.value.passwords.password;

      await this._authService.signup(email, password);

      await this._router.navigateByUrl('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          this._snackbar.open('Diese E-Mail wird bereits von einem anderen Account verwendet');
          break;
        default:
          this._snackbar.open(err);
          break;
      }
    }
  }

  private _initFormGroups() {
    this.fg = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      passwords: this._fb.group({
        password: this._fb.control('', [Validators.required, Validators.minLength(6)]),
        repeat: this._fb.control('')
      }, { validator: MatchValidator })
    });
  }

}
