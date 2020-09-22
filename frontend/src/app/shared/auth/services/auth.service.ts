import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

import {
  AskForParticipateDialogComponent
} from '../components/ask-for-participate-dialog/ask-for-participate-dialog.component';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token$: Observable<Token | undefined>;
  user$: Observable<firebase.User | null>;

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFirestore,
    private _dialog: MatDialog
  ) {
    this.token$ = this._createToken$();
    this.user$ = _auth.user;
  }

  async register(email: string, url = `${window.location.origin}/signin-callback`) {
    localStorage.setItem('redirect-uri', window.location.pathname);
    await this._db
      .collection('registrations')
      .doc(email)
      .set({ url, date: new Date().toISOString() });
    // Todo analytics tracking
  }

  getByToken(token: string) {
    return this._db.doc<Token>(`access_tokens/${token}`)
      .snapshotChanges().pipe(
        map(snapshot => {
          if (!snapshot.payload.exists) {
            return undefined;
          }
          return {
            ...snapshot.payload.data(),
            key: snapshot.payload.id
          } as Token;
        })
      );
  }

  async voteForCompany(token: string, company: string, points: number) {
    const data = await this.getByToken(token).pipe(
      first()
    ).toPromise();

    const company_votes = data?.company_votes || {};
    company_votes[company] = points;

    if (typeof data?.participate !== 'boolean') {
      this._askForParticipate(token);
    }

    return this._db
      .collection('access_tokens')
      .doc(token)
      .update({ company_votes });
  }

  getTokens() {
    return this._db
      .collection<Token>('access_tokens').valueChanges();
  }

  async voteForProduct(token: string, product: string, points: number) {
    const data = await this.getByToken(token).pipe(
      first()
    ).toPromise();

    const product_votes = data?.product_votes || {};
    product_votes[product] = points;

    if (typeof data?.participate !== 'boolean') {
      this._askForParticipate(token);
    }

    return this._db
      .collection('access_tokens')
      .doc(token)
      .update({ product_votes });
  }

  private async _askForParticipate(token: string) {
    const dialogRef = this._dialog.open(AskForParticipateDialogComponent, {
      disableClose: true,
      maxWidth: 'calc(100% - 32px)',
      panelClass: 'neward-overlay-pane',
      width: '450px'
    });

    const result = await dialogRef.afterClosed().toPromise();

    return this._db
      .collection('access_tokens')
      .doc(token)
      .update({ participate: result });
  }

  private _createToken$() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.getByToken(token);
    }
    return of(undefined);
  }

  signup(mail: string, password: string) {
    return this._auth.createUserWithEmailAndPassword(mail, password);
  }

  /** Admin accounts */
  async signin(email: string, password: string) {
    await this._auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this._auth.signOut();
  }
}
