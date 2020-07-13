import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, Observable } from 'apollo-link'

class WXApolloLink extends ApolloLink {
  constructor() {
    super()
  }

  request(operation) {
    return new Observable(observer => {
      Promise.resolve({ data: { name: 'asd' } })
        .then(data => {
          observer.next(data)
          observer.complete()
        })
        .catch(observer.error.bind(observer))
    })
  }
}

const client = new ApolloClient({
  link: new WXApolloLink(),
  cache: new InMemoryCache()
})

export const Provider = ({ children, ...props }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
