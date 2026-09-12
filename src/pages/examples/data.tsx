import type { Project, ProjectStatus } from '~/lib/projects'
import { ChevronLeft, ChevronRight, Pencil, Plus, RotateCcw, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { EmptyState, PageHeading } from '~/components/page'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { isProjects, projectPage, PROJECTS_KEY, seedProjects, statuses } from '~/lib/projects'
import { readStored, writeStored } from '~/lib/storage'

export default function DataPage() {
  const { t, i18n } = useTranslation()
  const makeSeed = () => seedProjects(index => t('data.seedName', { index }), t('data.seedDescription'))
  const [projects, setProjects] = useState<Project[]>(() => readStored(PROJECTS_KEY, isProjects, makeSeed()))
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [editor, setEditor] = useState<Project | null>(null)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState<Project | null>(null)
  const [restoring, setRestoring] = useState(false)
  const [storageError, setStorageError] = useState(false)
  const result = projectPage(projects, query, status, sort, page, i18n.resolvedLanguage || 'en')
  useEffect(() => {
    setStorageError(!writeStored(PROJECTS_KEY, projects))
  }, [projects])
  const commit = (rows: Project[]) => {
    setProjects(rows)
    toast.success(t('data.updated'))
  }
  const openCreate = () => {
    setEditing(false)
    setEditor({ id: crypto.randomUUID(), name: '', description: '', status: 'planned', createdAt: new Date().toISOString() })
  }
  return (
    <div className="space-y-8">
      <PageHeading title={t('data.title')} description={t('data.description')}>
        <Button onClick={openCreate}>
          <Plus />
          {t('data.create')}
        </Button>
      </PageHeading>
      {storageError && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{t('app.storageFailed')}</p>}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b p-4">
          <div className="relative min-w-0 flex-[1_1_240px]">
            <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
            <Input
              className="pl-9"
              aria-label={t('data.search')}
              placeholder={t('data.search')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
          </div>
          <select
            className="native-select flex-[1_1_140px] sm:flex-none"
            aria-label={t('data.status')}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
          >
            <option value="all">{t('data.all')}</option>
            {statuses.map(s => <option key={s} value={s}>{t(`data.${s}`)}</option>)}
          </select>
          <select
            className="native-select flex-[1_1_140px] sm:flex-none"
            aria-label={t('data.sort')}
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as 'asc' | 'desc')
              setPage(1)
            }}
          >
            <option value="asc">{t('data.asc')}</option>
            <option value="desc">{t('data.desc')}</option>
          </select>
        </div>
        <div className="hidden grid-cols-[1fr_130px_130px_90px] gap-4 border-b bg-muted/40 px-5 py-3 text-xs text-muted-foreground md:grid">
          <span>{t('data.name')}</span>
          <span>{t('data.status')}</span>
          <span>{t('data.created')}</span>
          <span className="text-right">{t('data.actions')}</span>
        </div>
        {result.rows.length
          ? (
              <ul className="divide-y">
                {result.rows.map(project => (
                  <li key={project.id} className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-4 md:grid-cols-[1fr_130px_130px_90px] md:gap-4">
                    <div className="col-span-2 min-w-0 md:col-span-1">
                      <h2 className="break-words text-sm font-medium">{project.name}</h2>
                      <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex min-w-0 flex-wrap items-center gap-2 md:contents">
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="w-fit">{t(`data.${project.status}`)}</Badge>
                      <time dateTime={project.createdAt} className="text-xs text-muted-foreground">{new Intl.DateTimeFormat(i18n.resolvedLanguage).format(new Date(project.createdAt))}</time>
                    </div>
                    <div className="flex gap-1 md:justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={t('data.editNamed', { name: project.name })}
                        onClick={() => {
                          setEditing(true)
                          setEditor({ ...project })
                        }}
                      >
                        <Pencil />
                      </Button>
                      <Button size="icon" variant="ghost" aria-label={t('data.deleteNamed', { name: project.name })} onClick={() => setDeleting(project)}><Trash2 /></Button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          : (
              <div className="p-5">
                <EmptyState title={t('data.empty')} description={t('data.emptyDesc')}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery('')
                      setStatus('all')
                      setPage(1)
                    }}
                  >
                    {t('data.clearFilters')}
                  </Button>
                  <Button onClick={openCreate}>{t('data.create')}</Button>
                </EmptyState>
              </div>
            )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t p-4">
          <p className="text-xs text-muted-foreground" aria-live="polite">{t('data.pagination', { total: result.total, page: result.current, pages: result.pages })}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" aria-label={t('data.previous')} disabled={result.current === 1} onClick={() => setPage(result.current - 1)}><ChevronLeft /></Button>
            <Button variant="outline" size="icon" aria-label={t('data.next')} disabled={result.current === result.pages} onClick={() => setPage(result.current + 1)}><ChevronRight /></Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{t('data.localHint')}</p>
        <Button variant="ghost" size="sm" onClick={() => setRestoring(true)}>
          <RotateCcw />
          {t('data.restore')}
        </Button>
      </div>
      <Dialog
        open={!!editor}
        onOpenChange={(open) => {
          if (!open)
            setEditor(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t(editing ? 'data.edit' : 'data.create')}</DialogTitle>
            <DialogDescription>{t('data.editorHint')}</DialogDescription>
          </DialogHeader>
          {editor && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                if (!editor.name.trim())
                  return
                const row = { ...editor, name: editor.name.trim(), description: editor.description.trim() }
                commit(editing ? projects.map(p => p.id === row.id ? row : p) : [row, ...projects])
                setEditor(null)
                setQuery('')
                setStatus('all')
                setPage(1)
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="project-name">{t('data.name')}</Label>
                <Input autoFocus id="project-name" required maxLength={120} value={editor.name} onChange={e => setEditor({ ...editor, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">{t('data.details')}</Label>
                <Textarea id="project-description" className="max-h-48 field-sizing-fixed overflow-y-auto" rows={4} maxLength={1000} value={editor.description} onChange={e => setEditor({ ...editor, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-status">{t('data.status')}</Label>
                <select id="project-status" className="native-select w-full" value={editor.status} onChange={e => setEditor({ ...editor, status: e.target.value as ProjectStatus })}>{statuses.map(s => <option key={s} value={s}>{t(`data.${s}`)}</option>)}</select>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline" type="button">{t('app.cancel')}</Button></DialogClose>
                <Button type="submit" disabled={!editor.name.trim()}>{t('form.save')}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!deleting || restoring}
        onOpenChange={(open) => {
          if (!open) {
            setDeleting(null)
            setRestoring(false)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(restoring ? 'data.restore' : 'data.delete')}</DialogTitle>
            <DialogDescription className="break-words">{restoring ? t('data.restoreConfirm') : t('data.deleteConfirm', { name: deleting?.name })}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">{t('app.cancel')}</Button></DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                commit(restoring ? makeSeed() : projects.filter(p => p.id !== deleting?.id))
                setDeleting(null)
                setRestoring(false)
                setPage(1)
                if (restoring) {
                  setQuery('')
                  setStatus('all')
                }
              }}
            >
              {t('app.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
