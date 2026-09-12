import type { ThemePreference } from '~/lib/preferences'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { PageHeading } from '~/components/page'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { updatePreferences, usePreferences } from '~/composables'
import i18n from '~/i18next'
import { cn } from '~/lib/utils'

function NotificationSettings({ notify, digest }: { notify: boolean, digest: boolean }) {
  const { t } = useTranslation()
  const [draft, setDraft] = useState({ notify, digest })
  const save = () => {
    const saved = updatePreferences(draft)
    toast[saved ? 'success' : 'error'](t(saved ? 'settings.saved' : 'app.storageFailed'))
  }
  return (
    <section className="settings-section">
      <div>
        <h2>{t('settings.notifications')}</h2>
        <p>{t('settings.localOnly')}</p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="notify-setting">{t('form.notify.title')}</Label>
          <Switch id="notify-setting" checked={draft.notify} onCheckedChange={notify => setDraft({ ...draft, notify })} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="digest-setting">{t('form.digest.title')}</Label>
          <Switch id="digest-setting" checked={draft.digest} onCheckedChange={digest => setDraft({ ...draft, digest })} />
        </div>
        <div className="flex flex-wrap justify-end gap-2 border-t pt-5">
          <Button
            variant="outline"
            onClick={() => {
              setDraft({ notify: true, digest: false })
              toast(t('settings.resetHint'))
            }}
          >
            {t('settings.reset')}
          </Button>
          <Button onClick={save}>{t('form.save')}</Button>
        </div>
      </div>
    </section>
  )
}
export default function Settings() {
  const { t } = useTranslation()
  const preferences = usePreferences()
  const check = (saved: boolean) => {
    if (!saved)
      toast.error(t('app.storageFailed'))
  }
  return (
    <div className="space-y-10">
      <PageHeading title={t('settings.title')} description={t('settings.description')} />
      <section className="settings-section">
        <div>
          <h2>{t('settings.appearance')}</h2>
          <p>{t('settings.immediate')}</p>
        </div>
        <div role="group" aria-label={t('settings.appearance')} className="grid grid-cols-3 gap-3">
          {([{ value: 'light', icon: Sun }, { value: 'dark', icon: Moon }, { value: 'system', icon: Monitor }] as const).map(({ value, icon: Icon }) => (
            <button key={value} aria-pressed={preferences.theme === value} onClick={() => check(updatePreferences({ theme: value as ThemePreference }))} className={cn('flex min-w-0 flex-col items-center gap-4 rounded-xl border bg-card px-2 py-6 text-sm', preferences.theme === value && 'border-primary bg-primary/5 text-primary ring-1 ring-primary')}>
              <Icon className="size-6" />
              {t(`settings.${value}`)}
            </button>
          ))}
        </div>
      </section>
      <section className="settings-section">
        <div>
          <h2>{t('app.language')}</h2>
          <p>{t('settings.immediate')}</p>
        </div>
        <div>
          <Label htmlFor="language-setting" className="sr-only">{t('app.language')}</Label>
          <select
            id="language-setting"
            className="native-select w-full sm:max-w-xs"
            value={i18n.resolvedLanguage?.startsWith('zh') ? 'zh' : 'en'}
            onChange={async (e) => {
              const language = e.target.value as 'zh' | 'en'
              await i18n.changeLanguage(language)
              check(updatePreferences({ language }))
            }}
          >
            <option value="zh">简体中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </section>
      <NotificationSettings notify={preferences.notify} digest={preferences.digest} />
    </div>
  )
}
