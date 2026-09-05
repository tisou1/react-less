import { Bell, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

export function NotificationSection() {
  const { t } = useTranslation()

  const notifyPromise = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: t('notify.deploy.loading'),
      success: t('notify.deploy.success'),
      error: t('notify.deploy.error'),
    })
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>{t('notify.title')}</CardTitle>
        <CardDescription>{t('notify.desc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success(t('notify.successToast'))}>
          <Check />
          {t('notify.successBtn')}
        </Button>
        <Button variant="destructive" onClick={() => toast.error(t('notify.errorToast'))}>
          {t('notify.errorBtn')}
        </Button>
        <Button variant="outline" onClick={notifyPromise}>
          <Loader2 />
          {t('notify.promiseBtn')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast(t('notify.newVersion'), {
            description: t('notify.newVersionDesc'),
            action: { label: t('notify.view'), onClick: () => toast.info(t('notify.releaseToast')) },
          })}
        >
          <Bell />
          {t('notify.actionBtn')}
        </Button>
      </CardContent>
    </Card>
  )
}
