// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: '1065134056159-5me7g3f44rdks49f5mctr2kmkhgs4h76.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUriApp: 'http://localhost:4200/home',
  existingScope: 'https%3A//www.googleapis.com/auth/drive.metadata.readonly',
  additionalScope: 'https://www.googleapis.com/auth/userinfo.email',
  authUrl: 'http://localhost:8000/auth',
  scrapeUrl: 'http://localhost:5000/scrape',
  dataUrl: 'http://localhost:8000/data',
  resultsUrl: 'http://localhost:8000/results'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
