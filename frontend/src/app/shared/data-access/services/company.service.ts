import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { environment } from '@environments/environment';
import shuffle from 'lodash/shuffle';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private _db: AngularFirestore,
    private _httpClient: HttpClient
  ) { }

  static fromAction(action: Action<DocumentSnapshot<Company>>): Company {
    return { ...action.payload.data() as Company, id: action.payload.id };
  }

  static fromDocumentChangeAction(action: DocumentChangeAction<Company>): Company {
    return { ...action.payload.doc.data(), id: action.payload.doc.id };
  }

  getAll(): Observable<Company[]> {
    return this._db.collection('companies').snapshotChanges().pipe(
      map(snapshots => snapshots.map(CompanyService.fromDocumentChangeAction)),
      map(companies => shuffle(companies))
    );
  }

  getById(id: string): Observable<Company> {
    return this._db.collection('companies').doc(id)
      .snapshotChanges().pipe(
        map(CompanyService.fromAction)
      );
  }

  contact(id: string, message: string, email: string, givenName?: string, familyName?: string) {
    const url = `${environment.contactUrl}`;

    return this._httpClient.post(url, {
      message, email, givenName, familyName, companyId: id
    }).pipe(retry(2));
  }
}
