import { DB_NAME } from '../constants';

export const SET_USER_DATA_ATTR = `
  mutation SetUserDataAttr (
    $authName: String!, 
    $value: jsonb = {}
  ) {
    update_${DB_NAME}_user(
      _append: {user_data: $value},
      where: {auth_name: {_eq: $authName}}
    ) {
      affected_rows
    }
  }
`;

export const GET_USER_DATA = `
  query GetUserData($authName: String!) {
    ${DB_NAME}_user(where: {
      auth_name: {_eq: $authName}
    }) {
      user_data
    }
  }
`;