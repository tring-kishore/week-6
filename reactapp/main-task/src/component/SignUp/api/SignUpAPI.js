import { gql, useMutation } from '@apollo/client';
export const SIGNUP_MUTATION = gql`
    mutation signUp($name :String! , $email :String! , $password : String!, $phone :String!)
    {
        createUser(
            input : {
                user: {
                    name: $name
                    email : $email
                    password : $password
                    phone : $phone
                }
            }
        )
        
        {
            user{
                id
                name
                email
                password
                phone
            }
        }
    }
`;

