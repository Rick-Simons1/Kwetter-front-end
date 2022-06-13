import { default as auth0Env} from '../../env.json';

export const environment = {
  production: true,
  auth: {
    domain: auth0Env.domain,
    clientId: auth0Env.clientId,
    redirectUri: "http://localhost:4200/login",
  },
};
