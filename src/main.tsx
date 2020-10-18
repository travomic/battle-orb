import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import { Router } from '@reach/router';

import './index.css';
import { AuLayout, UserMenu } from './components';
import { AuthPage, LobbyPage } from './pages';
import { streams } from './streams';

  ReactDOM.render(
    <React.StrictMode>
      <Auth0Provider
        clientId={import.meta.env.VITE_AUTH0_CLIENT}
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        redirectUri={import.meta.env.VITE_AUTH0_REDIRECT_URI}
      >
        <AuLayout title={`battle.orb.zone`} year={2020}>
          <UserMenu />
          <Router>
            <LobbyPage path="/" streams={streams} />
            <AuthPage path="/auth" />
          </Router>
        </AuLayout>
      </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )