// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { default as auth0Env} from '../../env.json';

export const environment = {
  production: false,
  auth: {
    domain: auth0Env.domain,
    clientId: auth0Env.clientId,
    redirectUri: "https://ashy-pebble-0272e8b03.1.azurestaticapps.net/login",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
