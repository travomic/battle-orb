import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  or?: React.ReactElement
}

export const AuthGate = ({ children, or }: React.PropsWithChildren<IProps>): React.ReactElement => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <>{children}</> : or ? or : <></>;
}
