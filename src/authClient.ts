import createAuth0Client from '@auth0/auth0-spa-js';

export default createAuth0Client({
  client_id: import.meta.env.VITE_AUTH0_CLIENT,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
});