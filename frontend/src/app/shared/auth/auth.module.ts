import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import {
  AskForParticipateDialogComponent
} from './components/ask-for-participate-dialog/ask-for-participate-dialog.component';
import { FirstVoteDialogComponent } from './components/first-vote-dialog/first-vote-dialog.component';
import { SigninDialogComponent } from './components/signin-dialog/signin-dialog.component';
import { InitialsPipe } from './pipes/initials.pipe';
import { NameColorPipe } from './pipes/name-color.pipe';
import { ValidTokenPipe } from './pipes/valid-token.pipe';

@NgModule({
  declarations: [
    FirstVoteDialogComponent,
    InitialsPipe,
    NameColorPipe,
    SigninDialogComponent,
    ValidTokenPipe,
    AskForParticipateDialogComponent
  ],
  exports: [
    FirstVoteDialogComponent,
    InitialsPipe,
    NameColorPipe,
    SigninDialogComponent,
    ValidTokenPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // AngularFire
    AngularFireAuthModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class AuthModule { }
