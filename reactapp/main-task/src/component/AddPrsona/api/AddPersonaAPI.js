import { gql } from '@apollo/client';

// GraphQL Mutation
export const ADD_PERSONA_MUTATION = gql`
 mutation AddPersona($userId: Int!, $name: String!, $quote: String, $description: String, $attitudes: String, $painpoints: String, $jobneeds: String, $activities: String, $image: String) {
  createPersona(
    input: {
      persona: {
        userId: $userId,
        name: $name,
        quote: $quote,
        description: $description,
        attitudes: $attitudes,
        painPoints: $painpoints,
        jobNeeds: $jobneeds,
        activities: $activities,
        image: $image
      }
    }
  ) {
    persona {
      id
      userId
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