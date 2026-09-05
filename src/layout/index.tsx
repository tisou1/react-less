import { Toaster } from '~/components/ui/sonner'
import { TooltipProvider } from '~/components/ui/tooltip'
import Footer from './footer'
import Header from './header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
            {children}
          </div>
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    </TooltipProvider>
  )
}
