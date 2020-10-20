import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import { Router } from '@reach/router';

import './index.css';
import { AuLayout, UserMenu } from './components';
import { GamePage, LobbyPage } from './pages';
import { streams } from './streams';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
      clientId={import.meta.env.VITE_AUTH0_CLIENT}
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      redirectUri={import.meta.env.VITE_AUTH0_REDIRECT_URI}
    >
      <AuLayout
        apiURI={import.meta.env.VITE_GRAPHQL_URI}
        title={`battle.orb.zone`}
        year={2020}
        aside={<>[ASIDE]</>}
      >
        <UserMenu logoutURL={import.meta.env.VITE_AUTH0_REDIRECT_URI} />
        <Router>
          <LobbyPage path="/" streams={streams} />
          <GamePage path="/game" streams={streams} />
        </Router>
      </AuLayout>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
