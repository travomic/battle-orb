import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { OrbBox } from '../components';

interface IProps extends RouteComponentProps {
  streams: any;
}

export const LobbyPage = ({streams}: IProps) => {
  React.useEffect(() => {
    console.log("STREAMS:", streams);
  }, [streams]);

  return (
    <section>
      <OrbBox rows={4} scale={1} />
    </section>
  );
};
