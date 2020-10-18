import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { OrbBox } from '../components';
import { useQuery } from 'urql';

const LobbyQuery = `
  query LobbyInfo {
    game {
      game_data
    }
  }
`;

interface IProps extends RouteComponentProps {
  streams: any;
}

export const LobbyPage = ({streams}: IProps) => {
  const [result] = useQuery({ query: LobbyQuery });
  const { data, fetching, error } = result;

  React.useEffect(() => {
    console.log("STREAMS:", streams);
  }, [streams])

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

      {fetching ? <p>Loading...</p> :
      (error) ? <p>Oh no... {error.message}</p> :
      <ul>
        {data.game.map((g: any, gameIndex: number) => (
          <li key={`game.${gameIndex}`}><pre>
            {JSON.stringify(g.data, null, 2)}
          </pre></li>
        ))}
      </ul>}
    </section>
  );
};
