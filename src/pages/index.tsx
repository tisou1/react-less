import { ArrowRight, Blocks, Check, Code2, Copy, Database, ListTodo, Settings2, Terminal } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

const modules = [
  { path: '/components', icon: Blocks, key: 'components' },
  { path: '/examples/data', icon: Database, key: 'data' },
  { path: '/settings', icon: Settings2, key: 'settings' },
  { path: '/todo', icon: ListTodo, key: 'todo' },
]
export default function Index() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('pnpm install\npnpm dev')
      toast.success(t('app.copied'))
    }
    catch {
      toast.error(t('app.copyFailed'))
    }
  }
  return (
    <div className="space-y-14">
      <section className="grid items-center gap-10 py-5 lg:grid-cols-[1.15fr_1fr] lg:py-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {t('landing.eyebrow')}
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t('landing.title')}
            <br />
            <span className="text-primary">{t('landing.accent')}</span>
          </h1>
          <p className="max-w-lg text-base leading-8 text-muted-foreground">{t('landing.description')}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/components">
                {t('landing.explore')}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline"><Link to="/examples/data">{t('landing.tryData')}</Link></Button>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {['React 19', 'Vite 8', 'TypeScript', 'Tailwind CSS v4'].map(item => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="size-3 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b bg-muted/50 px-5 py-3">
            <span className="flex items-center gap-2 text-sm">
              <Terminal className="size-4 text-primary" />
              {t('landing.quickStart')}
            </span>
            <Button size="icon" variant="ghost" aria-label={t('app.copy')} onClick={copy}><Copy /></Button>
          </div>
          <div className="space-y-5 p-6 font-mono text-sm">
            <p className="text-muted-foreground">
              #
              {t('landing.install')}
            </p>
            <p>
              <span className="mr-3 text-primary">$</span>
              pnpm install
            </p>
            <p>
              <span className="mr-3 text-primary">$</span>
              pnpm dev
            </p>
            <div className="border-t pt-4 text-xs text-muted-foreground">
              localhost:3333
              <span className="float-right text-primary">{t('landing.ready')}</span>
            </div>
          </div>
          <div className="border-t bg-primary/5 p-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Code2 className="size-4 text-primary" />
              {t('landing.routing')}
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (name.trim())
                  navigate(`/hi/${encodeURIComponent(name.trim())}`)
              }}
            >
              <Input aria-label={t('placeholder')} placeholder={t('placeholder')} value={name} maxLength={80} onChange={e => setName(e.target.value)} />
              <Button type="submit" disabled={!name.trim()} aria-label={t('landing.go')}><ArrowRight /></Button>
            </form>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t('landing.modules')}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t('landing.modulesDesc')}</p>
          </div>
          <Link to="/test" className="flex items-center gap-2 text-sm text-primary hover:underline">
            {t('nav.playground')}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(({ path, icon: Icon, key }) => (
            <Link key={key} to={path} className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-primary/5">
              <Icon className="mb-6 size-6 text-primary" />
              <h3 className="flex items-center justify-between font-semibold">
                {t(`landing.${key}.title`)}
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary" />
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`landing.${key}.desc`)}</p>
            </Link>
          ))}
        </div>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground">
        <span>{t('landing.note')}</span>
        <span className="font-mono text-xs">React Compiler · shadcn/ui · i18next</span>
      </div>
    </div>
  )
}
