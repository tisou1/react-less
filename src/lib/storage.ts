export function readStored<T>(key: string, validate: (value: unknown) => value is T, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    const value: unknown = raw ? JSON.parse(raw) : null
    return validate(value) ? value : fallback
  }
  catch {
    return fallback
  }
}
export function writeStored(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  }
  catch {
    return false
  }
}
