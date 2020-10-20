export const SUBSCRIBE_TO_MESSAGES = `
  subscription getMessages {
    message(order_by: { timestamp: desc }) {
      text
      timestamp
      author {
        userName
      }
    }
  }
`;
