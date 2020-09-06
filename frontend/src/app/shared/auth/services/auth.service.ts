import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token$: Observable<Token | undefined>;
  user$: Observable<firebase.User | null>;

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFirestore
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
    const company_votes = await this.getByToken(token).pipe(
      first(),
      map((data: Token) => data.company_votes || {})
    ).toPromise();

    company_votes[company] = points;

    return this._db
      .collection('access_tokens')
      .doc(token)
      .update({ company_votes });
  }

  async voteForProduct(token: string, product: string, points: number) {
    const product_votes = await this.getByToken(token).pipe(
      first(),
      map((data: Token) => data.product_votes || {})
    ).toPromise();

    product_votes[product] = points;

    return this._db
      .collection('access_tokens')
      .doc(token)
      .update({ product_votes });
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

  async signin(email: string, password: string) {
    await this._auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this._auth.signOut();
  }

}
