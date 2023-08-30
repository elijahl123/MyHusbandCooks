// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'my-husband-cooks',
    appId: '1:895944752629:web:232ff813487ad8b501f4bc',
    storageBucket: 'my-husband-cooks.appspot.com',
    apiKey: 'AIzaSyCUZrsx5R2H2B6T53NRNifJ5nmB6R5AWTk',
    authDomain: 'my-husband-cooks.firebaseapp.com',
    messagingSenderId: '895944752629',
    measurementId: 'G-HS49HHGPF7',
  },
  stripe: {
    publicKey: 'pk_live_51NkZY9Audd3spP87mQuQSpw1Zh77Kbt99XmuWCvJ8X5kg5JrHRdq1jrxD1XvaDC1cSxexrsiI7hINI8jNzvzHvu400laaF6prJ',
    secretKey: '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',
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
