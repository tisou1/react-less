import type { Preferences, ThemePreference } from '~/lib/preferences'
import { loadPreferences, savePreferences } from '~/lib/preferences'

let preferences = loadPreferences()
const media = window.matchMedia('(prefers-color-scheme: dark)')
function applyTheme() {
  const dark = preferences.theme === 'dark' || (preferences.theme === 'system' && media.matches)
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
}
export function getPreferences() {
  return preferences
}
export function updatePreferences(patch: Partial<Preferences>) {
  preferences = { ...preferences, ...patch }
  applyTheme()
  const saved = savePreferences(preferences)
  window.dispatchEvent(new Event('preferences-change'))
  return saved
}
export function __changeTheme(theme: ThemePreference) {
  return updatePreferences({ theme })
}
media.addEventListener('change', applyTheme)
applyTheme()
