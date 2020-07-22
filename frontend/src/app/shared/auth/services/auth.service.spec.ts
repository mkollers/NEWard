import { AngularFirestore } from '@angular/fire/firestore';
import { instance, mock } from 'ts-mockito';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let angularFireStoreMock: AngularFirestore;

  beforeEach(() => {
    angularFireStoreMock = mock<AngularFirestore>();
  });

  it('should be created', () => {
    // Arrange
    const angularFireStore = instance(angularFireStoreMock);

    // Act
    const service = new AuthService(angularFireStore);

    // Assert
    expect(service).toBeTruthy();
  });
});
