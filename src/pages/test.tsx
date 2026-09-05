import type { RootState } from '~/store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '~/components/ui/button'
import { decremented, incremented } from '~/store/reducers/counterSlice'

export default function Test() {
  const { t } = useTranslation()
  const { counter } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <div className="text-emerald-400 text-2xl pt-16 sm:pt-1">
      <div>{t('hello.world')}</div>
      <div>
        {t('common:ns', { name: 'siry' })}
        {' '}
        --
        {' '}
        {t('ns', { ns: 'common', name: 'siry' })}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="text-pink-800 w-6 h-6 leading-6 text-center">{counter.value}</div>
        <Button variant="outline" size="icon" onClick={() => dispatch(incremented())}>+</Button>
        <Button variant="outline" size="icon" onClick={() => dispatch(decremented())}>-</Button>
      </div>
    </div>
  )
}
