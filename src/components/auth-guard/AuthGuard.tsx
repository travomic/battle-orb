import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {}

export const AuthGuard = ({ children }: React.PropsWithChildren<IProps>) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <>{children}</> : <b>UNAUTHORIZED</b>;
}
