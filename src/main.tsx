import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// import 'virtual:windi.css'
import { Provider } from 'react-redux'
// import App from './App'
import { BrowserRouter as Router, useRoutes } from 'react-router'
import routes from '~react-pages'
import Layout from '~/layout'
import store from './store'
import '~/i18next'

import './index.css'

const root = createRoot(document.getElementById('root')!)

function App() {
  return (
    <Suspense fallback={<p>...</p>}>
      {useRoutes(routes)}
    </Suspense>
  )
}

root.render(
  <Provider store={store}>
    <Layout>
      <Router>
        <App />
      </Router>
    </Layout>
  </Provider>,
)

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Header/>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root'),
// )
