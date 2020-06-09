import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import shuffle from 'lodash/shuffle';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _db: AngularFirestore
  ) { }

  static fromAction(action: Action<DocumentSnapshot<Product>>): Product {
    return { id: action.payload.id, ...action.payload.data() as Product };
  }

  static fromDocumentChangeAction(action: DocumentChangeAction<Product>): Product {
    return { id: action.payload.doc.id, ...action.payload.doc.data() };
  }

  getAll(): Observable<Product[]> {
    return this._db.collection('products').snapshotChanges().pipe(
      map(snapshots => snapshots.map(ProductService.fromDocumentChangeAction)),
      map(products => shuffle(products))
    );
  }

  getById(id: string): Observable<Product> {
    return this._db.collection('products').doc(id)
      .snapshotChanges().pipe(
        map(ProductService.fromAction)
      );
  }
}
