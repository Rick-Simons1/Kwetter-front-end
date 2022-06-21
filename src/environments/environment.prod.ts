import { default as auth0Env} from '../../env.json';

export const environment = {
  production: true,
  auth: {
    domain: auth0Env.domain,
    clientId: auth0Env.clientId,
    redirectUri: "https://ashy-pebble-0272e8b03.1.azurestaticapps.net/login",
  },
};
