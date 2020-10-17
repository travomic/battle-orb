import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AuLayout, OrbBox  } from './components';
import getAuthClient from './authClient';


const checkAuth = async () => {
  const authClient = await getAuthClient;
  console.log('authClient:', authClient);
};

checkAuth();

ReactDOM.render(
  <React.StrictMode>
    <AuLayout title={`battle.orb.zone`} year={2020}>
      <b>COMING SOON...</b>
      <OrbBox rows={4} scale={1} />
    </AuLayout>
  </React.StrictMode>,
  document.getElementById('root')
)
