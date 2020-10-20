import * as React from 'react';
import { useSubscription } from 'urql';
import { RouteComponentProps } from '@reach/router';
import { OrbBox } from '../components';
import { SUBSCRIBE_TO_MESSAGES } from '../graphql/queries/messages';

interface IProps extends RouteComponentProps {
  streams: any;
}

const handleSubscription = (messages: any[] = [], response: any) => {
  return [response.message, ...messages];
};

export const LobbyPage = ({streams}: IProps) => {
  const [messages] = useSubscription({ 
    query: SUBSCRIBE_TO_MESSAGES
  }, handleSubscription);

  React.useEffect(() => {
    console.log("STREAMS:", streams);
  }, [streams]);

  return (
    <section>
      <OrbBox rows={4} scale={1} />
      {(!messages.data) ? 
        <p>No new messages</p> :
        <ul>
          {messages.data.map(message => (
            <p key={message.id}>
              {message.from}: "{message.text}"
            </p>
          ))}
        </ul>
      }
    </section>
  );
};
