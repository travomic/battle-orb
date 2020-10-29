import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  // subscriptionExchange,
  Provider as QueryProvider,
} from 'urql';
import { fetchOptionsExchange } from './fetchOptionsExchange';
import { retryExchange } from '@urql/exchange-retry';
// import { SubscriptionClient } from '../../modules/subscriptions-transport-ws';

interface IProps {
  apiURI: string;
  schema?: string;
}

const retryOptions = {
  initialDelayMs: 1000,
  maxDelayMs: 15000,
  randomDelay: true,
  maxNumberAttempts: 2,
  retryIf: (err: any) => err && err.networkError,
};

export const AuraAPI = ({
  apiURI,
  schema,
  children, 
}: React.PropsWithChildren<IProps>) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  async function getAuthenticatedHeaders(overrideHeaders: any) {
    return await getAccessTokenSilently().then(accessToken => {
      let headers: any = {
        Authorization: 'Bearer ' + accessToken,
        'X-Hasura-Role': 'user',
        ...overrideHeaders
      };

      if (schema) {
        headers['X-Data-Schema'] = schema;
      };

      return headers;
    });
  };

  // console.log('CREATE SubscriptionClient:', apiURI);
  // const subscriptionClient = new SubscriptionClient(
  //   `wss:${apiURI}`,
  //   {
  //     reconnect: true,
  //     connectionParams: {
  //       authToken: async () => {
  //         return await getAccessTokenSilently().then (accessToken => {
  //           // console.log('ACCESS TOKEN:', accessToken);
  //           return accessToken;
  //         })
  //       }
  //     }
  //   }
  // );

  const graphQLClient = createClient({
    url: `https:${apiURI}`,
    exchanges: [
      dedupExchange,
      cacheExchange,
      retryExchange(retryOptions),
      fetchOptionsExchange(async (fetchOptions: any) => {
        console.log('incoming fetchOptions:', fetchOptions);
        const result = {
          ...fetchOptions,
          headers: isAuthenticated ? await getAuthenticatedHeaders(fetchOptions?.headers) : {},
        }
        return Promise.resolve(result);
      }),
      fetchExchange,
      // subscriptionExchange({
      //   forwardSubscription: operation => subscriptionClient.request(operation)
      // })
    ],
  });

  return (
    <QueryProvider value={graphQLClient}>
      {children}
    </QueryProvider>
  )
}