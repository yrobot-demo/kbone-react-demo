import React from 'react'
import ApolloClient, { ApolloLink, Observable } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const responsefy = data => ({
  text: () => Promise.resolve(JSON.stringify(data)),
  message: 'msg',
  status: 200
})

class WXApolloLink extends ApolloLink {
  request(operation) {
    console.log(operation)
    let unsubscribed = false

    return new Observable(observer => {
      Promise.resolve({ data: 'yrobot' })
        .then(res => {
          observer.next(result)
          observer.complete() //If subscriptions not supported
        })
        .error(err => {
          observer.error(error)
        })

      function unsubscribe() {
        unsubscribed = true
      }

      return unsubscribe
    })
  }
}

const client = new ApolloClient({
  link: new WXApolloLink()
})

export const Provider = ({ children, ...props }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
