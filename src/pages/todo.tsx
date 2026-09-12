import { Check, ListTodo, Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PageHeading } from '~/components/page'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { readStored, writeStored } from '~/lib/storage'
import { cn } from '~/lib/utils'

interface Todo {
  id: string
  text: string
  done: boolean
}

type Filter = 'all' | 'active' | 'done'

const STORAGE_KEY = 'todos'

function loadTodos(): Todo[] {
  return readStored(STORAGE_KEY, (value): value is Todo[] => Array.isArray(value)
    && value.every(row => row && typeof row.id === 'string' && typeof row.text === 'string' && typeof row.done === 'boolean')
    && new Set(value.map(row => row.id)).size === value.length, [])
}

export default function TodoPage() {
  const { t } = useTranslation()
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [storageError, setStorageError] = useState(false)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [pendingDelete, setPendingDelete] = useState<Todo | null>(null)

  useEffect(() => {
    setStorageError(!writeStored(STORAGE_KEY, todos))
  }, [todos])

  const doneCount = todos.filter(todo => todo.done).length
  const visible = filter === 'all'
    ? todos
    : filter === 'active'
      ? todos.filter(todo => !todo.done)
      : todos.filter(todo => todo.done)

  const addTodo = () => {
    const trimmed = text.trim()
    if (!trimmed) {
      toast.error(t('todo.toast.empty'))
      return
    }
    setTodos(todos => [
      { id: crypto.randomUUID(), text: trimmed, done: false },
      ...todos,
    ])
    setText('')
    toast.success(t('todo.toast.added'), { description: trimmed })
  }

  const toggleTodo = (id: string) => {
    setTodos(todos => todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    ))
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    const trimmed = editText.trim()
    if (!trimmed || !editingId)
      return
    setTodos(todos => todos.map(todo =>
      todo.id === editingId ? { ...todo, text: trimmed } : todo,
    ))
    setEditingId(null)
    toast.success(t('todo.toast.updated'))
  }

  const removeTodo = (todo: Todo) => {
    setTodos(todos => todos.filter(item => item.id !== todo.id))
    setPendingDelete(null)
    toast(t('todo.toast.deleted', { text: todo.text }))
  }

  const clearDone = () => {
    setTodos(todos => todos.filter(todo => !todo.done))
    toast.success(t('todo.toast.cleared', { count: doneCount }))
  }

  return (
    <div className="space-y-8">
      <PageHeading title={t('todo.title')} description={t('todo.desc')} />
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ListTodo className="size-5" />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{t('todo.stats.items', { count: todos.length })}</Badge>
              <Badge variant="outline">{t('todo.stats.active', { count: todos.length - doneCount })}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {storageError && <p role="alert" className="text-sm text-destructive">{t('app.storageFailed')}</p>}
          <div className="flex gap-2">
            <Input
              aria-label={t('todo.addPlaceholder')}
              placeholder={t('todo.addPlaceholder')}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>
              <Plus />
              {t('todo.add')}
            </Button>
          </div>
          <Tabs value={filter} onValueChange={v => setFilter(v as Filter)}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">{t('todo.filter.all')}</TabsTrigger>
              <TabsTrigger value="active" className="flex-1">{t('todo.filter.active')}</TabsTrigger>
              <TabsTrigger value="done" className="flex-1">{t('todo.filter.done')}</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="space-y-2">
            {visible.length === 0
              ? (
                  <p className="rounded-md border border-dashed py-8 text-center text-muted-foreground text-sm">
                    {t('todo.empty')}
                  </p>
                )
              : visible.map(todo => (
                  <div
                    key={todo.id}
                    className="group flex items-center gap-3 rounded-md border px-3 py-2.5 transition-colors hover:bg-accent/50"
                  >
                    <Checkbox
                      checked={todo.done}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      aria-label={t('todo.aria.complete', { text: todo.text })}
                    />
                    {editingId === todo.id
                      ? (
                          <div className="flex flex-1 gap-2">
                            <Input
                              autoFocus
                              aria-label={t('todo.edit')}
                              value={editText}
                              onChange={e => setEditText(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && saveEdit()}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={saveEdit}
                              aria-label={t('todo.aria.save')}
                            >
                              <Check />
                            </Button>
                          </div>
                        )
                      : (
                          <>
                            <span className={cn('min-w-0 flex-1 break-words text-sm', todo.done && 'text-muted-foreground line-through')}>
                              {todo.text}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-100"
                                  aria-label={t('todo.aria.menu')}
                                >
                                  <Pencil />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => startEdit(todo)}>
                                  <Pencil />
                                  {t('todo.edit')}
                                </DropdownMenuItem>
                                <DropdownMenuItem variant="destructive" onClick={() => setPendingDelete(todo)}>
                                  <Trash2 />
                                  {t('todo.delete.confirm')}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
                  </div>
                ))}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-muted-foreground text-xs">{t('todo.hint')}</p>
          <Button variant="ghost" size="sm" onClick={clearDone} disabled={doneCount === 0}>
            <Trash2 />
            {t('todo.clear')}
          </Button>
        </CardFooter>
        <Dialog open={!!pendingDelete} onOpenChange={open => !open && setPendingDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('todo.delete.title')}</DialogTitle>
              <DialogDescription>
                {t('todo.delete.desc', { text: pendingDelete?.text ?? '' })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t('todo.delete.cancel')}</Button>
              </DialogClose>
              <Button variant="destructive" onClick={() => pendingDelete && removeTodo(pendingDelete)}>
                {t('todo.delete.confirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}
