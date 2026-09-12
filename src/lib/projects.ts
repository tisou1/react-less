export const PROJECTS_KEY = 'react-less:projects:v1'
export const statuses = ['planned', 'active', 'done'] as const
export type ProjectStatus = typeof statuses[number]
export interface Project { id: string, name: string, description: string, status: ProjectStatus, createdAt: string }
export function isProjects(value: unknown): value is Project[] {
  return Array.isArray(value) && value.every((p: unknown) => {
    if (!p || typeof p !== 'object')
      return false
    const row = p as Record<string, unknown>
    return typeof row.id === 'string' && typeof row.name === 'string' && row.name.trim().length > 0
      && typeof row.description === 'string' && statuses.includes(row.status as ProjectStatus)
      && typeof row.createdAt === 'string' && Number.isFinite(Date.parse(row.createdAt))
  }) && new Set(value.map(p => p.id)).size === value.length
}
export function seedProjects(name: (index: number) => string, description: string): Project[] {
  return Array.from({ length: 12 }, (_, index) => ({ id: `sample-${index + 1}`, name: name(index + 1), description, status: statuses[index % 3], createdAt: new Date(Date.UTC(2026, 8, index + 1)).toISOString() }))
}
export function projectPage(projects: Project[], query: string, status: string, sort: 'asc' | 'desc', page: number, locale = 'en') {
  const filtered = projects.filter(p => p.name.toLocaleLowerCase(locale).includes(query.trim().toLocaleLowerCase(locale)) && (status === 'all' || p.status === status))
    .sort((a, b) => (sort === 'asc' ? 1 : -1) * a.name.localeCompare(b.name, locale, { numeric: true }))
  const pages = Math.max(1, Math.ceil(filtered.length / 10))
  const current = Math.min(Math.max(1, page), pages)
  return { rows: filtered.slice((current - 1) * 10, current * 10), total: filtered.length, pages, current }
}
