import { AngularFirestore } from '@angular/fire/firestore/firestore';
import * as faker from 'faker';
import sortBy from 'lodash/sortBy';
import { first } from 'rxjs/operators';
import {
  createAction,
  createAngularFirestoreCollection,
  createAngularFirestoreSingleCollection,
  createDocumentChangeAction
} from 'src/firebase-test-helper';
import { instance, mock, when } from 'ts-mockito';

import { Company } from '../models/company';
import { CompanyMock } from '../models/company.mock';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  it('should be created', () => {
    // Arrange
    const angularFirestoreMock = mock<AngularFirestore>();
    const angularFirestore = instance(angularFirestoreMock);

    // Act
    const service = new CompanyService(angularFirestore);

    // Assert
    expect(service).toBeTruthy();
  });

  it('should return a list of companies', async () => {
    // Arrange
    const expected: Company[] = [];
    for (let i = 0; i < faker.random.number(50); i++) {
      expected.push({ ...new CompanyMock() });
    }
    const angularFirestoreMock = mock<AngularFirestore>();
    const collection = createAngularFirestoreCollection(expected, e => e.id);
    when(angularFirestoreMock.collection('companies')).thenReturn(collection);
    const angularFirestore = instance(angularFirestoreMock);

    // Act
    const service = new CompanyService(angularFirestore);
    const result = await service.getAll().pipe(first()).toPromise();

    // Assert
    expect(sortBy(result, c => c.id)).toEqual(sortBy(expected, c => c.id));
  });

  it('should return a company', async () => {
    // Arrange
    const expected: Company = { ...new CompanyMock() };
    const raw = { ...expected };
    delete raw.id;

    const angularFirestoreMock = mock<AngularFirestore>();
    const collection = createAngularFirestoreSingleCollection(expected.id, raw);
    when(angularFirestoreMock.collection('companies')).thenReturn(collection);
    const angularFirestore = instance(angularFirestoreMock);

    // Act
    const service = new CompanyService(angularFirestore);
    const result = await service.getById(expected.id).pipe(first()).toPromise();

    // Assert
    expect(result).toEqual(expected);
  });

  describe('transformations', () => {
    it('should transform a firebase action', () => {
      // Arrange
      const expected = new CompanyMock();
      const raw = { ...expected };
      delete raw.id;
      const action = createAction(expected.id, raw);

      // Act
      const result = CompanyService.fromAction(action);

      // Assert
      expect(result).toEqual({ ...expected });
    });

    it('should transform a firebase document change action', () => {
      // Arrange
      const expected = new CompanyMock();
      const raw = { ...expected };
      delete raw.id;
      const action = createDocumentChangeAction(expected.id, raw);

      // Act
      const result = CompanyService.fromDocumentChangeAction(action);

      // Assert
      expect(result).toEqual({ ...expected });
    });
  });
});
