import ReactDOM from 'react-dom'
import '@/utils/doPageInit'

const createPage = (page) => {
  const createApp = () => {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)
    ReactDOM.render(page, container)
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
