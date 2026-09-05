import { Languages, Moon, Sun } from 'lucide-react'
import { NavLink } from 'react-router'
import { Button } from '~/components/ui/button'
import { __changeTheme } from '~/composables'
import { cn } from '~/lib/utils'
import i18n from '../i18next'

const navItems = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/todo', labelKey: 'nav.todo' },
  { to: '/test', labelKey: 'nav.playground' },
]

export default function Header() {
  const { t } = useTranslation()
  const changeLanguage = () => {
    const language = localStorage.getItem('i18nextLng')
    if (language?.startsWith('zh'))
      i18n.changeLanguage('en')

    else
      i18n.changeLanguage('zh')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-1">
        <NavLink to="/" className="mr-3 flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground text-sm">
            R
          </span>
          <span className="hidden font-semibold sm:inline">react-less</span>
        </NavLink>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
              isActive && 'bg-accent font-medium text-accent-foreground',
            )}
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" title={t('change')} onClick={changeLanguage}>
          <Languages />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="dark:hidden"
          aria-label={t('theme.toDark')}
          onClick={() => __changeTheme('dark')}
        >
          <Moon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden dark:inline-flex"
          aria-label={t('theme.toLight')}
          onClick={() => __changeTheme('light')}
        >
          <Sun />
        </Button>
      </div>
    </header>
  )
}
