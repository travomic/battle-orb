import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router';

import './index.css';
import getAuthClient from './authClient';
import { AuLayout, UserMenu } from './components';
import { AuthPage, LobbyPage } from './pages';
import { streams } from './streams';

getAuthClient.then(authClient => {
  ReactDOM.render(
    <React.StrictMode>
      <AuLayout title={`battle.orb.zone`} year={2020}>
        <UserMenu authClient={authClient} />
        <Router>
          <LobbyPage path="/" streams={streams} />
          <AuthPage path="/auth" authClient={authClient} />
        </Router>
      </AuLayout>
    </React.StrictMode>,
    document.getElementById('root')
  )
});