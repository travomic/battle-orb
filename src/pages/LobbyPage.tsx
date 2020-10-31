import * as React from 'react';
import { RouteComponentProps, useLocation } from '@reach/router';
import { AuthGate, ChatBox, OrbBox } from '../components';

interface IProps extends RouteComponentProps {
  streams: any;
}

export const LobbyPage = ({streams}: IProps) => {
  const location = useLocation();

  React.useEffect(() => {
    console.log("STREAMS:", streams);
  }, [streams]);

  return (
    <section>
      <OrbBox rows={4} scale={1} />
      <AuthGate>
        <ChatBox channel="#lobby" />
      </AuthGate>
    </section>
  );
};
