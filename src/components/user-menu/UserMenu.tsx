import * as React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

interface IProps {
}

export const UserMenu = ({}: IProps) => {
  const { 
    error,
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  return (
    <nav>
      {isLoading ? '...' : '⭐️'}
      {isAuthenticated ? '👍' : '👎'}
      <pre>
        {JSON.stringify(user, null, 2)}
        ---
        {JSON.stringify(error, null, 2)}
      </pre>
      <button onClick={loginWithRedirect}>LOG-IN</button>
      <button onClick={() => logout}>LOG-OUT</button>
    </nav>
  );
}