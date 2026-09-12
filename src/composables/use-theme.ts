import { useSyncExternalStore } from 'react'
import { defaultPreferences } from '~/lib/preferences'
import { getPreferences } from './dark'

function subscribe(callback: () => void) {
  window.addEventListener('preferences-change', callback)
  return () => window.removeEventListener('preferences-change', callback)
}
export function usePreferences() {
  return useSyncExternalStore(subscribe, getPreferences, () => defaultPreferences)
}
function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, () => document.documentElement.classList.contains('dark') ? 'dark' : 'light', () => 'light')
  return { theme }
}
