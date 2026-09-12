import { afterEach, describe, expect, it, vi } from 'vitest'
import { defaultPreferences, isPreferences, loadPreferences, savePreferences, SETTINGS_KEY } from '../src/lib/preferences'
import { isProjects, projectPage, seedProjects } from '../src/lib/projects'
import { readStored, writeStored } from '../src/lib/storage'

afterEach(() => vi.unstubAllGlobals())

function memoryStorage() {
  const data = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
  })
  return data
}

describe('local preferences and storage recovery', () => {
  it('round-trips all preferences without losing notification choices', () => {
    memoryStorage()
    const value = { ...defaultPreferences, theme: 'dark' as const, language: 'zh' as const, notify: false, digest: true }
    expect(savePreferences(value)).toBe(true)
    expect(loadPreferences()).toEqual(value)
    expect(savePreferences({ ...loadPreferences(), theme: 'system' })).toBe(true)
    expect(loadPreferences()).toEqual({ ...value, theme: 'system' })
  })
  it('uses defaults for missing, invalid JSON and invalid schemas', () => {
    const storage = memoryStorage()
    expect(loadPreferences()).toEqual(defaultPreferences)
    for (const raw of ['{', 'null', '[]', '{"theme":"dark"}', '{"theme":"purple","language":"zh","notify":true,"digest":false}']) {
      storage.set(SETTINGS_KEY, raw)
      expect(loadPreferences()).toEqual(defaultPreferences)
    }
    expect(isPreferences({ ...defaultPreferences, notify: 'false' })).toBe(false)
    expect(isPreferences({ ...defaultPreferences, theme: ['dark'] })).toBe(false)
  })
  it('survives blocked storage without throwing or modifying the input', () => {
    vi.stubGlobal('localStorage', { getItem: () => {
      throw new Error('Blocked')
    }, setItem: () => {
      throw new Error('Quota')
    } })
    const value = { ...defaultPreferences }
    expect(readStored(SETTINGS_KEY, isPreferences, value)).toEqual(value)
    expect(writeStored(SETTINGS_KEY, value)).toBe(false)
    expect(value).toEqual(defaultPreferences)
  })
})

describe('project data', () => {
  const projects = seedProjects(index => `Project ${index}`, 'Description')
  it('validates persisted rows and rejects malformed and duplicate entries', () => {
    expect(isProjects(projects)).toBe(true)
    expect(isProjects([])).toBe(true)
    for (const value of [null, {}, [null], [{ ...projects[0], status: 'unknown' }], [{ ...projects[0], createdAt: 'bad' }], [{ ...projects[0], name: ' ' }], [projects[0], projects[0]]])
      expect(isProjects(value)).toBe(false)
  })
  it('combines trimmed case-insensitive search and status filters', () => {
    const result = projectPage(projects, ' PROJECT 1 ', 'planned', 'asc', 1)
    expect(result.rows.map(p => p.name)).toEqual(['Project 1', 'Project 10'])
    expect(projectPage(projects, 'nothing', 'all', 'asc', 8)).toMatchObject({ rows: [], pages: 1, current: 1 })
  })
  it('sorts numerically, paginates by ten and clamps pages after deletion or filtering', () => {
    expect(projectPage(projects, '', 'all', 'asc', 1).rows).toHaveLength(10)
    expect(projectPage(projects, '', 'all', 'asc', 2).rows.map(p => p.name)).toEqual(['Project 11', 'Project 12'])
    expect(projectPage(projects, '', 'all', 'desc', 1).rows[0].name).toBe('Project 12')
    expect(projectPage(projects.slice(0, 10), '', 'all', 'asc', 2).current).toBe(1)
    expect(projectPage(projects, '', 'done', 'asc', 2).current).toBe(1)
    expect(projects[0].name).toBe('Project 1')
  })
})
