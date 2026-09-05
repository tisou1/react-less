import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export function InteractionSection() {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('interaction.dialog.title')}</CardTitle>
          <CardDescription>{t('interaction.dialog.desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">{t('interaction.dialog.button')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('interaction.dialog.heading')}</DialogTitle>
                <DialogDescription>{t('interaction.dialog.body')}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t('interaction.dialog.cancel')}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => toast.success(t('interaction.dialog.confirmToast'))}>
                    {t('interaction.dialog.confirm')}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('interaction.dropdown.title')}</CardTitle>
          <CardDescription>{t('interaction.dropdown.desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {t('interaction.dropdown.button')}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-44">
              <DropdownMenuLabel>{t('interaction.dropdown.label')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info(t('interaction.dropdown.toast.profile'))}>
                <User />
                {t('interaction.dropdown.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info(t('interaction.dropdown.toast.settings'))}>
                <Settings />
                {t('interaction.dropdown.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => toast.error(t('interaction.dropdown.toast.logout'))}
              >
                <LogOut />
                {t('interaction.dropdown.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('interaction.tooltip.title')}</CardTitle>
          <CardDescription>{t('interaction.tooltip.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon"><Bell /></Button>
            </TooltipTrigger>
            <TooltipContent>{t('interaction.tooltip.notifications')}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon"><Settings /></Button>
            </TooltipTrigger>
            <TooltipContent>{t('interaction.tooltip.settings')}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon"><User /></Button>
            </TooltipTrigger>
            <TooltipContent>{t('interaction.tooltip.profile')}</TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  )
}
