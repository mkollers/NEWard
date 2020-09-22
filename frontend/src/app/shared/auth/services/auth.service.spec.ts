import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Mock } from 'src/test-helper';
import { instance, mock } from 'ts-mockito';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let angularFireAuth: Mock<AngularFireAuth>;
  let angularFireStoreMock: AngularFirestore;
  let dialog: Mock<MatDialog>;

  beforeEach(() => {
    angularFireAuth = new Mock<AngularFireAuth>();
    angularFireStoreMock = mock<AngularFirestore>();
    dialog = new Mock<MatDialog>();
  });

  it('should be created', () => {
    // Arrange
    const angularFireStore = instance(angularFireStoreMock);

    // Act
    const service = new AuthService(angularFireAuth.instance, angularFireStore, dialog.instance);

    // Assert
    expect(service).toBeTruthy();
  });
});
