import * as admin from 'firebase-admin';
import * as _ from 'lodash';

export function initialize() {
    const serviceAccount = require('./serviceAccountKey.json');
    const databaseUrl = 'https://bodylife-neward.firebaseio.com';

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseUrl
    });
}