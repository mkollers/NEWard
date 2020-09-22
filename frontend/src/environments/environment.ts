// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: any = {
  production: false,
  contactUrl: 'https://europe-west3-bodylife-neward.cloudfunctions.net/contact',
  firebase: {
    apiKey: 'AIzaSyBOLQIiDBo1RicZWZKJUaXLr_lO_dK7nWA',
    authDomain: 'bodylife-neward.firebaseapp.com',
    databaseURL: 'https://bodylife-neward.firebaseio.com',
    projectId: 'bodylife-neward',
    storageBucket: 'bodylife-neward.appspot.com',
    messagingSenderId: '1094727823839',
    appId: '1:1094727823839:web:0201cd5052782f025d546a'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
