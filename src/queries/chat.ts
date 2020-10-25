import { DB_NAME } from '../constants';

export const SUBSCRIBE_TO_CHAT = `
  subscription ChatSubscription($target: String!) {
    ${DB_NAME}_chat(
      where: {target: {_eq: $target}}, 
      order_by: { sent_at: desc }
    ) {
      target
      sent_at
      message
      fromUser {
        user_name
        user_id
      }
    }
  }
`;

export const SEND_CHAT = `
  mutation SendChat($userId: uuid!, $target: String!, $text: String!) {
    insert_${DB_NAME}_chat_one(object: {
      target: $target,
      from_user_id: $userId, 
      message: $text,
    }) {
      target
      message
      sent_at
    }
  }
`;
