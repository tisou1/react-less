import type { ReactNode } from 'react'
import { Component } from 'react'
import i18n from '~/i18next'

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      const zh = (i18n.resolvedLanguage || navigator.language).startsWith('zh')
      return (
        <div role="alert" className="mx-auto max-w-lg space-y-4 p-8">
          <h1 className="text-2xl font-semibold">{zh ? '页面暂时无法显示' : 'This page could not load'}</h1>
          <p>{zh ? '请重新加载页面后再试。' : 'Reload the page to try again.'}</p>
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" onClick={() => window.location.reload()}>{zh ? '重新加载' : 'Reload page'}</button>
        </div>
      )
    }
    return this.props.children
  }
}
