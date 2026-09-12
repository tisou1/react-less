import type { RootState } from '~/store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { PageHeading } from '~/components/page'
import { Button } from '~/components/ui/button'
import { decremented, incremented } from '~/store/reducers/counterSlice'

export default function Test() {
  const { t } = useTranslation()
  const { counter } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <div className="space-y-6">
      <PageHeading title={t('nav.playground')} description={t('app.playgroundDesc')} />
      <div>
        {t('common:ns', { name: 'siry' })}
        {' '}
        --
        {' '}
        {t('ns', { ns: 'common', name: 'siry' })}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="min-w-10 text-center text-2xl font-semibold text-primary">{counter.value}</div>
        <Button variant="outline" size="icon" aria-label={t('app.increment')} onClick={() => dispatch(incremented())}>+</Button>
        <Button variant="outline" size="icon" aria-label={t('app.decrement')} onClick={() => dispatch(decremented())}>-</Button>
      </div>
    </div>
  )
}
