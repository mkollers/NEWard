import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _db: AngularFirestore
  ) { }

  async register(email: string, url = 'https://neward.bodylife-medien.com/signin-callback') {
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
            key: snapshot.payload.id,
            ...snapshot.payload.data()
          };
        })
      );
  }
}
