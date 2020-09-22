import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as faker from 'faker';
import sortBy from 'lodash/sortBy';
import { first } from 'rxjs/operators';
import {
  createAction,
  createAngularFirestoreCollection,
  createAngularFirestoreSingleCollection,
  createDocumentChangeAction,
  Mock
} from 'src/test-helper';
import { instance, mock, when } from 'ts-mockito';

import { Product } from '../models/product';
import { ProductMock } from '../models/product.mock';
import { ProductService } from './product.service';

describe('ProductService', () => {
  it('should be created', () => {
    // Arrange
    const angularFirestoreMock = mock<AngularFirestore>();
    const angularFirestore = instance(angularFirestoreMock);
    const httpClient = new Mock<HttpClient>();

    // Act
    const service = new ProductService(angularFirestore, httpClient.instance);

    // Assert
    expect(service).toBeTruthy();
  });

  it('should return a list of products', async () => {
    // Arrange
    const expected: Product[] = [];
    for (let i = 0; i < faker.random.number(50); i++) {
      expected.push({ ...new ProductMock() });
    }
    const angularFirestoreMock = mock<AngularFirestore>();
    const collection = createAngularFirestoreCollection(expected, e => e.id);
    when(angularFirestoreMock.collection('products')).thenReturn(collection);
    const angularFirestore = instance(angularFirestoreMock);
    const httpClient = new Mock<HttpClient>();

    // Act
    const service = new ProductService(angularFirestore, httpClient.instance);
    const result = await service.getAll().pipe(first()).toPromise();

    // Assert
    expect(sortBy(result, c => c.id)).toEqual(sortBy(expected, c => c.id));
  });

  it('should return a product', async () => {
    // Arrange
    const expected: Product = { ...new ProductMock() };
    const raw = { ...expected };
    raw.id = '';

    const angularFirestoreMock = mock<AngularFirestore>();
    const collection = createAngularFirestoreSingleCollection(expected.id, raw);
    when(angularFirestoreMock.collection('products')).thenReturn(collection);
    const angularFirestore = instance(angularFirestoreMock);
    const httpClient = new Mock<HttpClient>();

    // Act
    const service = new ProductService(angularFirestore, httpClient.instance);
    const result = await service.getById(expected.id).pipe(first()).toPromise();

    // Assert
    expect(result).toEqual(expected);
  });

  describe('transformations', () => {
    it('should transform a firebase action', () => {
      // Arrange
      const expected = new ProductMock();
      const raw = { ...expected };
      raw.id = '';
      const action = createAction(expected.id, raw);

      // Act
      const result = ProductService.fromAction(action);

      // Assert
      expect(result).toEqual({ ...expected });
    });

    it('should transform a firebase document change action', () => {
      // Arrange
      const expected = new ProductMock();
      const raw = { ...expected };
      raw.id = '';
      const action = createDocumentChangeAction(expected.id, raw);

      // Act
      const result = ProductService.fromDocumentChangeAction(action);

      // Assert
      expect(result).toEqual({ ...expected });
    });
  });
});
