import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, useRoutes } from 'react-router'
import routes from '~react-pages'
import { ErrorBoundary } from '~/components/error-boundary'
import { LoadingState } from '~/components/page'
import Layout from '~/layout'
import store from './store'
import '~/i18next'

import './index.css'

const root = createRoot(document.getElementById('root')!)

function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      {useRoutes(routes)}
    </Suspense>
  )
}

root.render(
  <ErrorBoundary>
    <Suspense fallback={<LoadingState />}>
      <Provider store={store}>
        <Router>
          <Layout>
            <ErrorBoundary><App /></ErrorBoundary>
          </Layout>
        </Router>
      </Provider>
    </Suspense>
  </ErrorBoundary>,
)
