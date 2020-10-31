import { DB_NAME } from '../constants';

export const SUBSCRIBE_TO_CHAT = `
  subscription ChatterChannel($target: String!) {
    ${DB_NAME}_chat(
      where: {target: {_eq: $target}}, 
      order_by: {sent_at: desc},
    ) {
      chat_id
      message
      fromUser {
        user_name
      }
      target
      sent_at
    }
  }
`;

export const SEND_CHAT = `
  mutation SendChat(
    $fromUserId: uuid!,
    $target: String!,
    $message: String!,
  ) {
    insert_battleOrb_chat(objects: {
      from_user_id: $fromUserId,
      target: $target,
      message: $message,
    }) {
      returning {
        chat_id
        message
        fromUser {
          user_name
        }
        target
        sent_at
      }
    }
  }
`;
