import { Toaster } from '~/components/ui/sonner'
import { TooltipProvider } from '~/components/ui/tooltip'
import Footer from './footer'
import Header from './header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only z-50 rounded bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed">{t('app.skip')}</a>
        <Header />
        <main id="main" tabIndex={-1} className="min-w-0 flex-1"><div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">{children}</div></main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    </TooltipProvider>
  )
}
