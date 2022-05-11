import { useSelector } from 'react-redux'
import type { RootState } from '~/store'

export default function Home() {
  const { counter } = useSelector((state: RootState) => state)

  return (
    <div>Home,count:{counter.value}</div>
  )
}
