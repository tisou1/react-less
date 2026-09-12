import { Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { __changeTheme, updatePreferences, useTheme } from '~/composables'
import { cn } from '~/lib/utils'
import i18n from '../i18next'

const navItems = [{ to: '/', key: 'home' }, { to: '/components', key: 'components' }, { to: '/examples/data', key: 'data' }, { to: '/todo', key: 'todo' }, { to: '/settings', key: 'settings' }]
export default function Header() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const location = useLocation()
  const [menu, setMenu] = useState<string | null>(null)
  const open = menu === location.key
  const persist = (saved: boolean) => {
    if (!saved)
      toast.error(t('app.storageFailed'))
  }
  const changeLanguage = async () => {
    const language = i18n.resolvedLanguage?.startsWith('zh') ? 'en' : 'zh'
    await i18n.changeLanguage(language)
    persist(updatePreferences({ language }))
  }
  const links = navItems.map(item => <NavLink key={item.to} end={item.to === '/'} to={item.to} onClick={() => setMenu(null)} className={({ isActive }) => cn('rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground', isActive && 'bg-primary/10 font-medium text-primary')}>{t(`nav.${item.key}`)}</NavLink>)
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <NavLink to="/" onClick={() => setMenu(null)} className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-mono text-sm text-primary-foreground">r.</span>
          react-less
        </NavLink>
        <nav aria-label={t('app.navigation')} className="hidden items-center gap-1 md:flex">{links}</nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label={t('app.language')} onClick={changeLanguage}><Languages /></Button>
          <Button variant="ghost" size="icon" aria-label={t(theme === 'dark' ? 'theme.toLight' : 'theme.toDark')} onClick={() => persist(__changeTheme(theme === 'dark' ? 'light' : 'dark'))}>{theme === 'dark' ? <Sun /> : <Moon />}</Button>
          <Button className="md:hidden" variant="ghost" size="icon" aria-label={t('app.menu')} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setMenu(open ? null : location.key)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label={t('app.navigation')}
          className="flex flex-col gap-1 border-t px-4 py-3 md:hidden"
          onKeyDown={(e) => {
            if (e.key === 'Escape')
              setMenu(null)
          }}
        >
          {links}
        </nav>
      )}
    </header>
  )
}
