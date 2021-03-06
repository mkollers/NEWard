import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { environment } from '@environments/environment';
import shuffle from 'lodash/shuffle';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _db: AngularFirestore,
    private _httpClient: HttpClient
  ) { }

  static fromAction(action: Action<DocumentSnapshot<Product>>): Product {
    return { ...action.payload.data() as Product, id: action.payload.id };
  }

  static fromDocumentChangeAction(action: DocumentChangeAction<Product>): Product {
    return { ...action.payload.doc.data(), id: action.payload.doc.id };
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

  contact(id: string, message: string, email: string, givenName?: string, familyName?: string) {
    const url = `${environment.contactUrl}`;

    return this._httpClient.post(url, {
      message, email, givenName, familyName, productId: id
    }).pipe(retry(2));
  }
}
