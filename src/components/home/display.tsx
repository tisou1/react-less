import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { Skeleton } from '~/components/ui/skeleton'

export function DisplaySection() {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('display.overview.title')}</CardTitle>
            <Badge>Live</Badge>
          </div>
          <CardDescription>{t('display.overview.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">ZS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{t('display.overview.name')}</p>
              <p className="text-muted-foreground text-xs">{t('display.overview.role')}</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Admin</Badge>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="font-semibold text-2xl">128</p>
              <p className="text-muted-foreground text-xs">{t('display.overview.commits')}</p>
            </div>
            <div>
              <p className="font-semibold text-2xl">42</p>
              <p className="text-muted-foreground text-xs">PR</p>
            </div>
            <div>
              <p className="font-semibold text-2xl">9</p>
              <p className="text-muted-foreground text-xs">{t('display.overview.issues')}</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">{t('display.overview.skeletonHint')}</p>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => toast.info(t('display.overview.learnToast'))}
          >
            <Check />
            {t('display.overview.learnMore')}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('display.badges.title')}</CardTitle>
          <CardDescription>{t('display.badges.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>default</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="destructive">destructive</Badge>
            <Badge variant="outline">outline</Badge>
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">{t('display.badges.skeletonHint')}</p>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Badge variant="outline">{t('display.badges.radius')}</Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
