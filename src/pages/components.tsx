import { DisplaySection } from '~/components/home/display'
import { FormSection } from '~/components/home/forms'
import { InteractionSection } from '~/components/home/interactions'
import { NotificationSection } from '~/components/home/notifications'
import { PageHeading } from '~/components/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

export default function ComponentsPage() {
  const { t } = useTranslation()
  return (
    <div className="space-y-8">
      <PageHeading title={t('showcase.title')} description={t('app.demoHint')} />
      <Tabs defaultValue="display">
        <TabsList className="flex h-auto w-full flex-wrap justify-start sm:w-fit">{['display', 'form', 'interaction', 'notification'].map(key => <TabsTrigger key={key} value={key}>{t(`showcase.tabs.${key}`)}</TabsTrigger>)}</TabsList>
        <TabsContent value="display"><DisplaySection /></TabsContent>
        <TabsContent value="form"><FormSection /></TabsContent>
        <TabsContent value="interaction"><InteractionSection /></TabsContent>
        <TabsContent value="notification"><NotificationSection /></TabsContent>
      </Tabs>
    </div>
  )
}
