import createAuth0Client from '@auth0/auth0-spa-js';

export default createAuth0Client({
  client_id: process.env.VITE_AUTH0_CLIENT,
  domain: process.env.VITE_AUTH0_DOMAIN,
});