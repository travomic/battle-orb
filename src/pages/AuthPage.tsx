import * as React from 'react';
import { useLocation, RouteComponentProps, Link } from '@reach/router';

interface IProps extends RouteComponentProps {
}

export const AuthPage = ({ }: IProps) => {
  const location = useLocation();

  React.useEffect(() => {
    console.log('AUTH RESPONSE:', location.search);
  }, []);

  return (
    <section>
      <h2>AUTHENTICATED?</h2>

      <Link to='/'>GOTO LOBBY</Link>
    </section>
  );
}