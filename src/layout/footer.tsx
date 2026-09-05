export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 text-muted-foreground text-sm sm:flex-row sm:px-6">
        <p>react-less · React 19 + Vite 8 + Tailwind CSS v4 + shadcn/ui</p>
        <p>
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          {t('footer.tagline')}
        </p>
      </div>
    </footer>
  )
}
