# battle.orb.zone

Hasura powered turn based competitive strategy game. **(Work in Progress)**

This is a **hackathon** entry for: [Hasura Enterprise GraphQL Conf](https://hasura.io/enterprisegraphql/hackathon/)

Following setup instructions from the following resources:

- [Hasura GraphQL One-click App on DigitalOcean](https://hasura.io/docs/1.0/graphql/core/deployment/deployment-guides/digital-ocean-one-click.html)
- [TypeScript + Vite + ReactJS + urql](https://zaiste.net/posts/modern-lightweight-reactjs-setup-graphql-vite-urql/)
- [Auth0 JWT Integration with Hasura](https://hasura.io/docs/1.0/graphql/core/guides/integrations/auth0-jwt.html)
- [Auth0 "SPA" SDK](https://auth0.com/docs/libraries/auth0-single-page-app-sdk)
- [urql with async fetchOptions](https://formidable.com/open-source/urql/docs/common-questions/#how-do-we-achieve-asynchronous-fetchoptions)
- [react-urql subscriptionExchange](https://www.howtographql.com/react-urql/8-subscriptions/)

## Things I learned along the way...

- Using Vite as the build-tool, requires that if you want to use environment variables in your code, you must do a couple things.  First, they *must* be prefixed with `VITE_` and if using TypeScript, you need to update `./src/react-app-env.d.ts` to declare the ones you need, so that the production build doesn't fail with: **_"... does not exist on type 'ProcessEnv'."_**
- After struggling quite a bit wondering why my configured DigitalOcean Application Environment Variables weren't getting picked up in the build output, I ended up adding the build-config ENV vars into the `.env.production` file included in the git repo, and learned Vite requires them to be references them via `import.meta.env.VITE_*` in the source code. _(...and './src/react-app-env.d.ts' needed to have an updated interface for `ImportMeta`.)_
- `callbag-basics` does not play well with Vite, and needed to be replaced with `callbag-basics-esmodules` instead.
- `@auth0/auth0-react` is magical, providing crisp clean React hooks to provide login/authentication flow a breeze.
- `urql` uses `wonka` under the hood, which aligns extremely well with the callbags I plan on using for the reactive-event streams.
- Trying to leverage `subscriptions-transport-ws` for GQL subscriptions within an esmodules ecosystem, leads to a rough time... I have ended up copying the github repo sources, and converting them to typescript local imports by hand. (keeping the source LICENSE files, etc.)

## Here's how my Auth0 config settings look...
_(To allow for production and local development.)_
|Setting|Value|
|---|---|
|Allowed Callback URLs|https://battle.orb.zone/auth,http://localhost:3000/auth|
|Allowed Logout URLs|https://battle.orb.zone/logout,http://localhost:3000/logout|
|Allowed Web Origins|https://battle.orb.zone,http://localhost:3000|
|Allowed Origins (CORS)|https://battle.orb.zone,http://localhost:3000|

## Some more articles about the technologies I chose to use...

- [Comparing Callbags to RxJS](https://egghead.io/articles/comparing-callbags-to-rxjs-for-reactive-programming)
