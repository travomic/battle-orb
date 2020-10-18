import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from 'urql';
import { AuthGuard } from '../components';

interface IProps extends RouteComponentProps {
  streams: any;
}

const GameQuery = `
  query GameInfo {
    game {
      game_data
    }
  }
`;

export const GamePage = ({ streams }: IProps) => {
  const [result, reexecuteQuery] = useQuery({
    query: GameQuery,
  });
  const { data, fetching, error } = result;

  return (<>
    <AuthGuard>
      {fetching ? <p>Loading...</p> :
      error ? <p>Oh no... {error.message}</p> :
      <ul>
        {data.game.map((g: any, gameIndex: number) => (
          <li key={`game.${gameIndex}`}><pre>
            {JSON.stringify(g.data, null, 2)}
          </pre></li>
        ))}
      </ul>}

      <button onClick={reexecuteQuery}>TRY AGAIN</button>
    </AuthGuard>

    <Link to="/">Go to <b>LOBBY</b> screen.</Link>

    <hr />
    <small>
      <pre>{JSON.stringify(streams, null, 2)}</pre>
    </small>
  </>);
};
