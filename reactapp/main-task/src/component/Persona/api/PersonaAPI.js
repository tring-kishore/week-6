import { gql } from "@apollo/client";
export const PERSONA_QUERY = gql`
    query Personas($user_Id: Int!) {
  allPersonas(condition: { userId: $user_Id }) {
    nodes {
      id
      name
      quote
      description
      attitudes
      painPoints
      jobNeeds
      activities
      image
    }
  }
}
`;