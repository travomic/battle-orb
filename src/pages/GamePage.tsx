import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from 'urql';
import { AuthGate } from '../components';

interface IProps extends RouteComponentProps {
  streams: any;
}

const GameQuery = `
  query GameInfo {
    game {
      gameId
      gameData
      playerA
      playerB
    }
  }
`;

export const GamePage = ({ streams }: IProps) => {
  const [result, reexecuteQuery] = useQuery({
    query: GameQuery,
  });
  const { data, fetching, error } = result;

  return (<>
    <AuthGate>
      {fetching ? <p>Loading...</p> :
      error ? <p>Oh no... {error.message}</p> :
      <ul>
        {data.game.map((g: any, gameIndex: number) => (
          <li key={`game.${gameIndex}`}><pre>
            {JSON.stringify(g.gameId, null, 2)}
          </pre></li>
        ))}
      </ul>}

      <button onClick={reexecuteQuery}>TRY AGAIN</button>
    </AuthGate>

    <Link to="/">Go to <b>LOBBY</b> screen.</Link>

    <hr />
    <small>
      <pre>{JSON.stringify(streams, null, 2)}</pre>
    </small>
  </>);
};
