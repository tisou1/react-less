import { useParams } from 'react-router'
import { HomeLink, PageHeading } from '~/components/page'

export default function Name() {
  const { name } = useParams()
  const { t } = useTranslation()
  return (
    <div className="space-y-8 break-words">
      <PageHeading title={t('app.greeting', { name })} description={t('landing.routing')} />
      <HomeLink />
    </div>
  )
}
