import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import '~/i18next'
import './index.css'
// import App from './App'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import 'virtual:windi.css'
import { Provider } from 'react-redux'
import store from './store'
import Header from '~/layout/header'
import routes from '~react-pages'

const App = () => {
  return (
    <Suspense fallback={<p>...</p>}>
      {useRoutes(routes)}
    </Suspense>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
