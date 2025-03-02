import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query  Login($email: String!, $password: String!) {
  allUsers(condition: {email: $email, password: $password}) {
    nodes {
      id
      name
      password
      phone
      email
    }
  }
}
`;
