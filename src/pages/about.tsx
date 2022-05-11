import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import type { RootState } from '~/store'

export default function Home() {
  const { counter } = useSelector((state: RootState) => state)
  return (
    <div>
      <div>Home,count:{counter.value}</div>
      <Link to="/">返回首页</Link>
      <Link to="home">到home</Link>

      <Outlet />
    </div>
  )
}
