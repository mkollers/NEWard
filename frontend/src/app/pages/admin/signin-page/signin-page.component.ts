import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '@shared/auth/services/auth.service';

@Component({
  selector: 'neward-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninPageComponent {
  fg: FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _snackbar: MatSnackBar,
    private _router: Router,
    title: Title
  ) {
    title.setTitle('Anmeldung als Admininstrator');
    this._initFormGroup();
  }

  async submit() {
    try {
      const email: string = this.fg.value.email;
      const password: string = this.fg.value.password;

      await this._authService.signin(email, password);

      await this._router.navigateByUrl('/admin/statistics');
    } catch (err) {
      switch (err.code) {
        default:
          this._snackbar.open(err);
          break;
      }
    }
  }

  private _initFormGroup() {
    this.fg = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [Validators.required])
    });
  }

}
