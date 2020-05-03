import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import '@/utils/doPageInit'

const createPage = page => {
  const createApp = () => {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)
    ReactDOM.render(<Provider store={store}>{page}</Provider>, container)
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
