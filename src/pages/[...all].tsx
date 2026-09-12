import { EmptyState, HomeLink, PageHeading } from '~/components/page'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="space-y-8">
      <PageHeading title="404" description={t('app.notFound')} />
      <EmptyState title={t('app.notFound')} description={t('app.notFoundDesc')}><HomeLink /></EmptyState>
    </div>
  )
}
