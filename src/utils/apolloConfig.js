import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, Observable } from 'apollo-link'

class WXLink extends ApolloLink {
  constructor(options = {}) {
    super()
    this.options = options
    wx.cloud.init({
      env: options.env
    })
  }

  request(operation) {
    return new Observable(observer => {
      console.log(operation)
      // const { callFunction = wx.cloud.callFunction } = this.options
      // callFunction({
      wx.cloud.callFunction({
        name: this.options.name || 'graphql',
        data: operation,
        success: function(res) {
          observer.next(res)
          observer.complete()
        },
        fail: observer.error
      })
    })
  }
}

const client = new ApolloClient({
  link: new WXLink({
    name: 'graphql',
    env:'ycalcu-qjgig',
    callFunction: wx.cloud.callFunction
  }),
  cache: new InMemoryCache()
})

export const Provider = ({ children, ...props }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
