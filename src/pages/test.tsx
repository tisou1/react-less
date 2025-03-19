import type { RootState } from '~/store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { decremented, incremented } from '~/store/reducers/counterSlice'

export default function Test() {
  const { t } = useTranslation()
  const { counter } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <div
      className="text-emerald-400  text-2xl pt-16 sm:pt-1 dark:bg-black dark:text-white"
    >
      <div>{t('hello.world')}</div>
      <div>
        {t('common:ns', { name: 'siry' })}
        {' '}
        --
        {' '}
        {t('ns', { ns: 'common', name: 'siry' })}
      </div>
      <div className="flex justify-center items-center bg-black-900">
        <div className="text-2x text-pink-800 w-60px h-24px">{counter.value}</div>
        <div onClick={() => dispatch(incremented())} className="text-2xl text-blue-500/50 w-24px h-24px leading-24px cursor-pointer bg-gray-200  dark:bg--gray-700  rounded-4px mr-8px text-center">+</div>
        <div onClick={() => dispatch(decremented())} className="text-2xl text-blue-500 w-24px h-24px leading-24px cursor-pointer bg-gray-200  dark:bg--gray-70 rounded-4px text-center">-</div>
      </div>
    </div>
  )
}
