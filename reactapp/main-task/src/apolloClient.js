import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // GraphQL API endpoint
  cache: new InMemoryCache(), // Cache is still required, but we can bypass it
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // Always fetch from the network
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only', // Always fetch from the network
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'network-only', // Always fetch from the network
      errorPolicy: 'all',
    },
  },
});

export default client;