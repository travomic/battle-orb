import React from 'react';
import classes from './au-ui.module.styl';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  createClient, 
  dedupExchange, 
  cacheExchange, 
  fetchExchange, 
  Provider as QueryProvider
} from 'urql';
import { fetchOptionsExchange } from './fetchOptionsExchange';

interface IProps {
  apiURL: string;
  title: string;
  year: number;
}

export const AuLayout = ({
  apiURL,
  children, 
  title, 
  year,
}: React.PropsWithChildren<IProps>) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  async function getAuthenticatedHeaders() {
    return await getAccessTokenSilently().then(accessToken => {
      return {
        Authorization: 'Bearer ' + accessToken
      };
    });
  };

  const graphQLClient = createClient({
    url: apiURL,
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
    ],
  });

  return (
    <QueryProvider value={graphQLClient}>
      <div className={classes.root}>
        <header><h1>{title}</h1></header>
        <main>{children}</main>
        <aside></aside>
        <footer>{year}</footer>
      </div>
    </QueryProvider>
  )
}