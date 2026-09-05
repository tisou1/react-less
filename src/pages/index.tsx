import type { ChangeEvent, KeyboardEvent } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { DisplaySection } from '~/components/home/display'
import { FormSection } from '~/components/home/forms'
import { InteractionSection } from '~/components/home/interactions'
import { NotificationSection } from '~/components/home/notifications'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

function HeroSection() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const go = () => {
    if (name)
      navigate(`/hi/${name}`)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (name && e.key === 'Enter')
      go()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <Sparkles />
            React Compiler
          </Badge>
          <Badge variant="secondary">Vite 8</Badge>
          <Badge variant="outline">Tailwind CSS v4</Badge>
          <Badge variant="destructive">shadcn/ui</Badge>
        </div>
        <CardTitle className="text-2xl">{t('hero.title')}</CardTitle>
        <CardDescription>{t('hero.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex max-w-md gap-2">
          <Input
            placeholder={t('placeholder')}
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={go} disabled={!name}>
            GO
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Index() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <HeroSection />
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-xl tracking-tight">{t('showcase.title')}</h2>
          <p className="text-muted-foreground text-sm">{t('showcase.subtitle')}</p>
        </div>
        <Tabs defaultValue="display">
          <TabsList>
            <TabsTrigger value="display">{t('showcase.tabs.display')}</TabsTrigger>
            <TabsTrigger value="form">{t('showcase.tabs.form')}</TabsTrigger>
            <TabsTrigger value="interaction">{t('showcase.tabs.interaction')}</TabsTrigger>
            <TabsTrigger value="notification">{t('showcase.tabs.notification')}</TabsTrigger>
          </TabsList>
          <TabsContent value="display">
            <DisplaySection />
          </TabsContent>
          <TabsContent value="form">
            <FormSection />
          </TabsContent>
          <TabsContent value="interaction">
            <InteractionSection />
          </TabsContent>
          <TabsContent value="notification">
            <NotificationSection />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
