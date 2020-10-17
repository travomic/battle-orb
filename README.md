# battle.orb.zone

Hasura powered turn based competitive strategy game. **(Work in Progress)**

This is a **hackathon** entry for: [Hasura Enterprise GraphQL Conf](https://hasura.io/enterprisegraphql/hackathon/)

Following setup instructions from the following resources:

- [Hasura GraphQL One-click App on DigitalOcean](https://hasura.io/docs/1.0/graphql/core/deployment/deployment-guides/digital-ocean-one-click.html)
- [TypeScript + Vite + ReactJS + urql](https://zaiste.net/posts/modern-lightweight-reactjs-setup-graphql-vite-urql/)
- [Auth0 JWT Integration with Hasura](https://hasura.io/docs/1.0/graphql/core/guides/integrations/auth0-jwt.html)

## Things I learned along the way...

- Using Vite as the build-tool, requires that if you want to use environment variables in your code, you must do a couple things.  First, they *must* be prefixed with `VITE_` and if using TypeScript, you need to update `./src/react-app-env.d.ts` to declare the ones you need, so that the production build doesn't fail with: **_"... does not exist on type 'ProcessEnv'."_**
- 