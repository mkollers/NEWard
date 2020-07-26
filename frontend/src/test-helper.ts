import {
    Action,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
    DocumentChange,
    DocumentChangeAction,
    DocumentSnapshot,
    QueryDocumentSnapshot
} from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

export interface Mock<T> {
    mock: T;
    instance: T;
}

export function CreateMock<T>() {
    const m = mock<T>();
    return {
        mock: m, instance: instance(m)
    };
}

export const createAction = <T>(id: string, data: T) => {
    const actionMock = mock<Action<DocumentSnapshot<T>>>();
    const documentSnapshot = createDocumentSnapshot(id, data);
    when(actionMock.payload).thenReturn(documentSnapshot);
    return instance(actionMock);
};

export const createAngularFirestoreDocument = <T>(id: string, data: T) => {
    const documentMock = mock<AngularFirestoreDocument<T>>();
    const action = createAction(id, data);
    const actions$ = from([action]); // hot observable required
    when(documentMock.snapshotChanges()).thenReturn(actions$);
    return instance(documentMock);
};

export const createAngularFirestoreCollection = <T>(data: T[], id: (e: T) => string) => {
    const collectionMock = mock<AngularFirestoreCollection<T>>();
    const actions = data.map(e => createDocumentChangeAction(id(e), e));
    when(collectionMock.snapshotChanges()).thenReturn(of(actions));
    return instance(collectionMock);
};

export const createAngularFirestoreSingleCollection = <T>(id: string, data: T) => {
    const collectionMock = mock<AngularFirestoreCollection<T>>();
    const doc = createAngularFirestoreDocument(id, data);
    when(collectionMock.doc(id)).thenReturn(doc);
    return instance(collectionMock);
};

export const createDocumentSnapshot = <T>(id: string, data: T) => {
    const documentSnapshotMock = mock<DocumentSnapshot<T>>();
    when(documentSnapshotMock.id).thenReturn(id);
    when(documentSnapshotMock.data()).thenReturn(data);
    return instance(documentSnapshotMock);
};

export const createQueryDocumentSnapshot = <T>(id: string, data: T) => {
    const queryDocumentSnapshotMock = mock<QueryDocumentSnapshot<T>>();
    when(queryDocumentSnapshotMock.id).thenReturn(id);
    when(queryDocumentSnapshotMock.data()).thenReturn(data);
    return instance(queryDocumentSnapshotMock);
};

export const createDocumentChange = <T>(id: string, data: T) => {
    const documentChangeMock = mock<DocumentChange<T>>();
    const queryDocumentSnapshot = createQueryDocumentSnapshot(id, data);
    when(documentChangeMock.doc).thenReturn(queryDocumentSnapshot);
    return instance(documentChangeMock);
};

export const createDocumentChangeAction = <T>(id: string, data: T) => {
    const actionMock = mock<DocumentChangeAction<T>>();
    const documentChange = createDocumentChange(id, data);
    when(actionMock.payload).thenReturn(documentChange);
    return instance(actionMock);
};