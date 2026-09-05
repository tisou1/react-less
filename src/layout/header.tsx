import { Languages, Moon, Sun } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { __changeTheme } from '~/composables'
import i18n from '../i18next'

export default function Header() {
  const { t } = useTranslation()
  const changeLanguage = () => {
    const language = localStorage.getItem('i18nextLng')
    if (language === 'en')
      i18n.changeLanguage('zh-CN')

    else if (language === 'zh-CN')
      i18n.changeLanguage('en')
  }

  return (
    <div className="fixed z-[100] flex h-16 w-full items-center justify-end gap-1 border-b border-border px-6">
      <Button variant="ghost" size="icon" title={t('change')} onClick={changeLanguage}>
        <Languages />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="dark:hidden"
        aria-label="Switch to dark theme"
        onClick={() => __changeTheme('dark')}
      >
        <Moon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden dark:inline-flex"
        aria-label="Switch to light theme"
        onClick={() => __changeTheme('light')}
      >
        <Sun />
      </Button>
    </div>
  )
}
