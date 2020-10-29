import * as React from 'react';
import { useMutation, useSubscription } from 'urql';
import { SEND_CHAT, SUBSCRIBE_TO_CHAT } from '../../queries/chat';
import { useSessionState } from '../../hooks';

interface IProps {
  channel: string;
  className?: string;
}

const handleSubscription = (chatLog: any[] = [], response: any) => {
  console.log('CHAT RESPONSE:', response);
  return [response.chat, ...chatLog];
};

export const ChatBox = ({ className, channel }: IProps) => {
  const sess = useSessionState();
  const chatTextRef = React.useRef<any>(null);
  const [sendChatResult, sendChat] = useMutation(SEND_CHAT);

  const [chat] = useSubscription({ 
    query: SUBSCRIBE_TO_CHAT,
    variables: { target: channel }
  }, handleSubscription);

  const sendMessage = () => {
    const text = chatTextRef.current?.value ?? 'NO VALUE';
    console.log('channel:', channel, text);
    sendChat({
      target: channel,
      text: text,
      userId: sess.userUUID
    });
    chatTextRef.current.value = '';
  }

  console.log('sendChatResult:', sendChatResult);

  return (<div className={className}>
    {(!chat.data) ? 
      <p>No new messages</p> :
      <ul>
        {chat.data.map(msg => (
          <p key={msg.chat_id}>
            {msg.fromUser.user_name}: "{JSON.stringify(msg.message)}"
          </p>
        ))}
      </ul>
    }

    <input ref={chatTextRef} type="text" />
    <button onClick={sendMessage}>SEND</button>
  </div>);
}