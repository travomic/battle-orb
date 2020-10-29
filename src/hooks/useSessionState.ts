import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { JWT_URI } from '../constants';

export type TSessionState = {
  authKey?: string;
  userUUID?: string;
};

export const useSessionState = (): TSessionState => {
  const { user } = useAuth0();
  const [sessionState, setSessionState] = React.useState({});

  React.useEffect(() => {
    setSessionState(user?.[JWT_URI] ?? {});
  }, [user]);

  return sessionState;
}