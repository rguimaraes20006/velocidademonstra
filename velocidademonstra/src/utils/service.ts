import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://biexpert.com.br:8888',
  cache: new InMemoryCache(),
});

export default client;
