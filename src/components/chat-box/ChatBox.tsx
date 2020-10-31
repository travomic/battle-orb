import * as React from 'react';
import { useMutation, useSubscription } from 'urql';
import { SEND_CHAT, SUBSCRIBE_TO_CHAT } from '../../queries/chat';
import { useSanitize, useSessionState } from '../../hooks';
import { DB_NAME } from '../../constants';

interface IProps {
  channel: string;
  className?: string;
}

const handleSubscription = (chatLog: any[] = [], response: any) => {
  return response[`${DB_NAME}_chat`];
};

export const ChatBox = ({ className, channel }: IProps) => {
  const clean = useSanitize();
  const sess = useSessionState();
  const chatTextRef = React.useRef<any>(null);
  const [{ fetching: busySending }, sendChat] = useMutation(SEND_CHAT);

  const [chat] = useSubscription({ 
    query: SUBSCRIBE_TO_CHAT,
    variables: { target: channel }
  }, handleSubscription);

  const sendMessage = () => {
    const text = chatTextRef.current?.value ?? 'NO VALUE';

    sendChat({
      fromUserId: sess.userUUID,
      target: channel,
      message: text,
    });

    chatTextRef.current.value = '';
  }

  const handleTextKeyDown = (ev: any) => {
    if (ev.key === 'Enter') {
      sendMessage();
    }
  }

  return (<div className={className}>
    {(!chat.data) ? 
      <p>No new messages</p> :
      <ul>
        {chat.data.map((msg: any) => (
          <p key={msg.chat_id}>
            <b>{msg.fromUser.user_name}</b>: {clean(msg.message)}
          </p>
        ))}
      </ul>
    }

    <input ref={chatTextRef} onKeyDown={handleTextKeyDown} type="text" />
    <button disabled={busySending} onClick={sendMessage}>SEND</button>
  </div>);
}