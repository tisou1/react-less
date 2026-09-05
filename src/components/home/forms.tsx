import { Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'

export function FormSection() {
  const { t } = useTranslation()
  const [notify, setNotify] = useState(true)
  const [digest, setDigest] = useState(false)
  const [agree, setAgree] = useState(false)
  const [frequency, setFrequency] = useState('weekly')
  const [bio, setBio] = useState('')

  const handleSave = () => {
    if (!agree) {
      toast.error(t('form.toast.needAgree'))
      return
    }
    toast.success(t('form.toast.saved'), {
      description: t('form.toast.savedDesc', { frequency: t(`form.frequency.${frequency}`) }),
    })
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>{t('form.title')}</CardTitle>
        <CardDescription>{t('form.desc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notify">{t('form.notify.title')}</Label>
            <p className="text-muted-foreground text-xs">{t('form.notify.desc')}</p>
          </div>
          <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="digest">{t('form.digest.title')}</Label>
            <p className="text-muted-foreground text-xs">{t('form.digest.desc')}</p>
          </div>
          <Switch id="digest" checked={digest} onCheckedChange={setDigest} />
        </div>
        <div className="space-y-2">
          <Label>{t('form.frequency.label')}</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t('form.frequency.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">{t('form.frequency.realtime')}</SelectItem>
              <SelectItem value="daily">{t('form.frequency.daily')}</SelectItem>
              <SelectItem value="weekly">{t('form.frequency.weekly')}</SelectItem>
              <SelectItem value="never">{t('form.frequency.never')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">{t('form.bio.label')}</Label>
          <Textarea
            id="bio"
            placeholder={t('form.bio.placeholder')}
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" checked={agree} onCheckedChange={v => setAgree(v === true)} />
          <Label htmlFor="agree" className="font-normal">{t('form.agree')}</Label>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" onClick={() => toast(t('form.toast.reset'))}>
          {t('form.reset')}
        </Button>
        <Button onClick={handleSave}>
          <Check />
          {t('form.save')}
        </Button>
      </CardFooter>
    </Card>
  )
}
