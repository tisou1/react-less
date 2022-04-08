import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import 'virtual:windi.css'
import store from './store'
import { Provider } from 'react-redux'
import Header from '~/layout/header'
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