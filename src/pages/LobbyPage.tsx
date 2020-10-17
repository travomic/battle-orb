import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

import { OrbBox } from '../components';

export const LobbyPage = ({}: RouteComponentProps) => {
  return (
    <section>
      <h2>LOBBY</h2>

      <b>COMING SOON...</b>
      <OrbBox rows={4} scale={1} />

      <a rel="noopener"
        target="_blank"
        href="https://github.com/travomic/battle-orb">
        See Github Source.
      </a>
    </section>
  );
}