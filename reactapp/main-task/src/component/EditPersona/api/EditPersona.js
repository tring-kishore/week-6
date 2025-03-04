import { gql } from "@apollo/client";
export const GET_PERSONA_DATA = gql`

 query GetPersonaData($userId : Int!,$id : Int!) {
    allPersonas(condition: {userId: $userId, id:$id }) {
      nodes {
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
  
export const UPDATE_PERSONA = gql`
  mutation UpdatePersona($id: Int!,$name: String,$quote: String,$description: String,$attitudes: String,$painPoints: String,$jobNeeds: String,$activities: String,$image: String) {
    updatePersonaById(
      input: {
        id: $id
        personaPatch: {
          id: $id
          name: $name
          quote: $quote
          description: $description
          attitudes: $attitudes
          painPoints: $painPoints
          jobNeeds: $jobNeeds
          activities: $activities
          image: $image
        }
      }
    ) {
      persona {
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

export const DELETE_PERSONA = gql`
  mutation deletePersona($id: Int!) {
  deletePersonaById(input: {id: $id}) {
    persona{
			id
		}
  }
}
`;