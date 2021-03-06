import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import App from './App'

const authlink = setContext((_ , {headers}) => {
  const token = localStorage.getItem('user-token')
  return{
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httplink = new HttpLink({
  uri: 'http://localhost:4000'
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authlink.concat(httplink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'))
