import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, Observable } from 'apollo-link'
import { print } from 'graphql/language/printer'

class WXLink extends ApolloLink {
  constructor(options = {}) {
    super()
    this.options = options
  }
  request(operation) {
    return new Observable(observer => {
      wx.cloud.callFunction({
        name: this.options.name || 'graphql',
        data: {
          ...operation,
          query: print(operation.query)
        },
        success: function(res) {
          observer.next(res.result)
          observer.complete()
        },
        fail: observer.error
      })
    })
  }
}

wx.cloud.init({
  env: 'ycalcu-qjgig'
})

const client = new ApolloClient({
  link: new WXLink({
    name: 'graphql'
  }),
  cache: new InMemoryCache({
    addTypename: false
  })
})

export const Provider = ({ children, ...props }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
