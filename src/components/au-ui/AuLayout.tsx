import React from 'react';
import classes from './au-ui.module.styl';
import { useAuth0 } from '@auth0/auth0-react';
import { createClient, Provider as QueryProvider } from 'urql';

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
    return await getAccessTokenSilently().then(accessToken => ({
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
  )};

  const getAPIOptions = () => isAuthenticated ? getAuthenticatedHeaders() : {};

  const graphQLClient = createClient({
    url: apiURL,
    fetchOptions: getAPIOptions()
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