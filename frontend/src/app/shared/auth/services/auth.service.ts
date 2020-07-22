import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: AngularFireAuth
  ) {
  }

  async login(email: string) {
    console.log(window.location.href);
    await this._auth.sendSignInLinkToEmail(email, {
      url: window.location.href,
      handleCodeInApp: true
    });
  }
}
