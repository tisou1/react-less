import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import { decremented, incremented } from '~/store/reducers/counterSlice'
import { change } from '~/store/reducers/booleanSlice'

const Index = () => {
  const { counter, booleaner } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  console.log(counter.value)
  const [count, setCount] = useState<number>(0)
  const ref = useRef<any>(null)
  console.log('222')
  useEffect(() => {
    console.log(ref.current)
  })
  // store.subscribe(() => {
  //   console.log(store.getState());
  // })
  // const {value} = store.getState()
  const changeTheme = () => {
    document.documentElement.classList.toggle('dark')
  }
  return (
    <div
      className="text-emerald-400  text-2xl pt-16 sm:pt-10"
    >
      <div className="flex justify-center items-center bg-black-900">
        <div className="text-2x text-pink-800 w-60px h-24px text-current">{counter.value}</div>
        <div onClick={() => dispatch(incremented())} className="text-2xl text-blue-500/50 w-24px h-24px leading-24px cursor-pointer bg-gray-200  dark:bg--gray-700  rounded-4px mr-8px text-center">+</div>
        <div onClick={() => dispatch(decremented())} className="text-2xl text-blue-500 w-24px h-24px leading-24px cursor-pointer bg-gray-200  dark:bg--gray-70 rounded-4px text-center">-</div>
      </div>
      <Outlet />
    </div>
  )
}

export default Index
