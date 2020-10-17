import * as React from 'react';
import { useLocation, RouteComponentProps, Link } from '@reach/router';

interface IProps extends RouteComponentProps {
  authClient: any; // TODO: Type this, and move into a React.Context instead.
}

export const AuthPage = ({ authClient }: IProps) => {
  const location = useLocation();

  React.useEffect(() => {
    async function verifyAuthToken() {
      const accessToken = await authClient.getTokenSilently();
      console.log("ACCESS TOKEN:", accessToken);
    }

    console.log('AUTH RESPONSE:', location.search);

    verifyAuthToken();
  }, [authClient]);

  return (
    <section>
      <h2>AUTHENTICATED?</h2>

      <Link to='/'>GOTO LOBBY</Link>
    </section>
  );
}