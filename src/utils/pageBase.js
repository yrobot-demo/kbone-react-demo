import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import '@/utils/doPageInit'
import { Provider as ApolloProvider } from './apolloConfig'

const App = ({ children, store }) => {
  const [wxunload, setWxunload] = useState(false)
  window.addEventListener('wxunload', () => {
    setWxunload(true)
  })
  return wxunload ? null : (
    <ApolloProvider>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  )
}

const createPage = page => {
  const createApp = () => {
    ReactDOM.render(<App store={store}>{page}</App>, document.body)
  }
  if (!process.env.isMiniprogram) {
    // web 端
    createApp()
  } else {
    window.createApp = createApp
  }
  return createApp
}

export default createPage
