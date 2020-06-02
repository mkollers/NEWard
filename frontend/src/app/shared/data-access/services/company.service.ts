import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import shuffle from 'lodash/shuffle';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private _db: AngularFirestore
  ) { }

  static fromAction(action: Action<DocumentSnapshot<Company>>): Company {
    return { id: action.payload.id, ...action.payload.data() as Company };
  }

  static fromDocumentChangeAction(action: DocumentChangeAction<Company>): Company {
    return { id: action.payload.doc.id, ...action.payload.doc.data() };
  }

  getAll(): Observable<Company[]> {
    return this._db.collection('companies').snapshotChanges().pipe(
      map(snapshots => snapshots.map(CompanyService.fromDocumentChangeAction)),
      map(companies => [...companies, ...companies, ...companies, ...companies, ...companies, ...companies, ...companies]),
      map(companies => shuffle(companies))
    );
  }

  getById(id: string): Observable<Company> {
    return this._db.collection('companies').doc(id)
      .snapshotChanges().pipe(
        map(CompanyService.fromAction)
      );
  }
}
