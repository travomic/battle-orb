import React from 'react';
import classes from './au-ui.module.styl';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  createClient, 
  dedupExchange, 
  cacheExchange, 
  fetchExchange, 
  subscriptionExchange,
  Provider as QueryProvider
} from 'urql';
import { fetchOptionsExchange } from './fetchOptionsExchange';
import { SubscriptionClient } from '../../modules/subscriptions-transport-ws';

interface IProps {
  apiURI: string;
  title: string;
  year: number;
  aside: React.ReactNode;
}

export const AuLayout = ({
  apiURI,
  children, 
  title, 
  year,
  aside,
}: React.PropsWithChildren<IProps>) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  async function getAuthenticatedHeaders() {
    return await getAccessTokenSilently().then(accessToken => {
      return {
        Authorization: 'Bearer ' + accessToken
      };
    });
  };

  const subscriptionClient = new SubscriptionClient(
    `wss:${apiURI}`,
    {
      reconnect: true,
      connectionParams: {
        authToken: async () => {
          return await getAccessTokenSilently().then (accessToken => {
            console.log('ACCESS TOKEN:', accessToken);
            return accessToken;
          })
        }
      }
    }
  );

  const graphQLClient = createClient({
    url: `https:${apiURI}`,
    exchanges: [
      dedupExchange,
      cacheExchange,
      fetchOptionsExchange(async (fetchOptions: any) => {
        const result = {
          ...fetchOptions,
          headers: isAuthenticated ? await getAuthenticatedHeaders() : {},
        }
        return Promise.resolve(result);
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: operation => subscriptionClient.request(operation)
      })
    ],
  });

  return (
    <QueryProvider value={graphQLClient}>
      <div className={classes.root}>
        <header className={classes.head}>
          <h1>{title}</h1>
        </header>

        <main className={classes.main}>
          {children}
        </main>

        <aside className={classes.more}>
          {aside}
        </aside>

        <footer className={classes.foot}>
          {year}
        </footer>
      </div>
    </QueryProvider>
  )
}