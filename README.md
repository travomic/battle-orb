# battle.orb.zone

Hasura powered turn based competitive strategy game. **(Work in Progress)**

This is a **hackathon** entry for: [Hasura Enterprise GraphQL Conf](https://hasura.io/enterprisegraphql/hackathon/)

Following setup instructions from the following resources:

- [Hasura GraphQL One-click App on DigitalOcean](https://hasura.io/docs/1.0/graphql/core/deployment/deployment-guides/digital-ocean-one-click.html)
- [TypeScript + Vite + ReactJS + urql](https://zaiste.net/posts/modern-lightweight-reactjs-setup-graphql-vite-urql/)
- [Auth0 JWT Integration with Hasura](https://hasura.io/docs/1.0/graphql/core/guides/integrations/auth0-jwt.html)
- [Auth0 "SPA" SDK](https://auth0.com/docs/libraries/auth0-single-page-app-sdk)

## Things I learned along the way...

- Using Vite as the build-tool, requires that if you want to use environment variables in your code, you must do a couple things.  First, they *must* be prefixed with `VITE_` and if using TypeScript, you need to update `./src/react-app-env.d.ts` to declare the ones you need, so that the production build doesn't fail with: **_"... does not exist on type 'ProcessEnv'."_**
- I temporarilly ended up adding the build-config ENV vars into the `.env.local` file included in the git repo, and learned VITE allows `import.meta.env.VITE_*` through the build output. _(...and './src/react-app-env.d.ts' needed an updated interface for `ImportMeta`.)

## Here's how my Auth0 config settings look...
_(To allow for production and local development.)_
|Setting|Value|
|---|---|
|Allowed Callback URLs|https://battle.orb.zone/auth,http://localhost:3000/auth|
|Allowed Logout URLs|https://battle.orb.zone/logout,http://localhost:3000/logout|
|Allowed Web Origins|https://battle.orb.zone,http://localhost:3000|
|Allowed Origins (CORS)|https://battle.orb.zone,http://localhost:3000|
