export const JWT_URI = "https://hasura.io/jwt/claims";
export const DB_NAME = 'battleOrb';
export const SELF_OPTIONS = {
  fetchOptions: {
    headers: {'X-Hasura-Role': 'self'}
  }
};
export const SELF_CONTEXT = {
  context: SELF_OPTIONS
};