import type { ReactNode } from 'react'
import { ArrowRight, Inbox } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

export function PageHeading({ title, description, children }: { title: string, description: string, children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-xs tracking-widest text-primary">REACT-LESS / STARTER</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
      </div>
      {children}
    </div>
  )
}
export function EmptyState({ title, description, children }: { title: string, description?: string, children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-8 text-center">
      <Inbox className="size-8 text-muted-foreground" />
      <h2 className="font-medium">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </div>
  )
}
export function LoadingState() {
  const { t } = useTranslation(undefined, { useSuspense: false })
  return (
    <div role="status" className="space-y-5 py-8">
      <span className="sr-only">{t('app.loading')}</span>
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
export function HomeLink() {
  const { t } = useTranslation()
  return (
    <Button asChild variant="outline">
      <Link to="/">
        {t('app.home')}
        <ArrowRight />
      </Link>
    </Button>
  )
}
