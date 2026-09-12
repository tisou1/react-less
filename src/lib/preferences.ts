import { readStored, writeStored } from './storage'

export type ThemePreference = 'light' | 'dark' | 'system'
export interface Preferences { theme: ThemePreference, language: 'en' | 'zh' | 'auto', notify: boolean, digest: boolean }
export const SETTINGS_KEY = 'react-less:settings:v1'
export const defaultPreferences: Preferences = { theme: 'system', language: 'auto', notify: true, digest: false }
export function isPreferences(value: unknown): value is Preferences {
  if (!value || typeof value !== 'object')
    return false
  const p = value as Record<string, unknown>
  return typeof p.theme === 'string' && ['light', 'dark', 'system'].includes(p.theme)
    && typeof p.language === 'string' && ['en', 'zh', 'auto'].includes(p.language)
    && typeof p.notify === 'boolean' && typeof p.digest === 'boolean'
}
export function loadPreferences() {
  return readStored(SETTINGS_KEY, isPreferences, defaultPreferences)
}
export function savePreferences(value: Preferences) {
  return writeStored(SETTINGS_KEY, value)
}
