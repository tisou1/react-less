import { useSelector, useDispatch } from 'react-redux'
import { decremented, incremented } from '~/store/reducers/counterSlice'
import { change } from '~/store/reducers/booleanSlice'
import { RootState } from '../store'

export default () => {
  const { counter, booleaner } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()
  console.log(counter.value);
  const [count, setCount] = useState<number>(0)
  const ref = useRef<any>(null)
  useEffect(() => {
    console.log(ref.current);
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
      className="container mx-auto"
    >

      <div className='p-4 bg-blue-300 dark:(bg-black) opacity-80 text-3xl text-center relative'>
        <div className='float-right test-pink-300 text-2xl cursor-pointer dark:text-white' onClick={changeTheme}>模式</div>
        <div className='text-3xl text-bg dark:text-white'>  {booleaner.value + ''}</div>
        <div onClick={() => dispatch(change())} className='text-orange-400 hover:(bg-gray-400 font-medium text-red-600)'>改变</div>
      </div>
        <div onClick={() => setCount(count => count + 1)} className="md:(text-red-700) text-pink-500 sm:text-orange-400">  根路径...... {count} </div>
      <div className='flex justify-center items-center bg-black-900  dark:bg-white'>
        <div className="text-2x text-pink-800 w-60px h-24px text-current">{counter.value}</div>
        <div onClick={() => dispatch(incremented())} className="text-2xl text-blue-500/50 w-24px h-24px leading-24px cursor-pointer bg-blue-200  dark:bg-light-400 border-solid border-orange-600 border rounded-4px mr-8px text-center">+</div>
        <div onClick={() => dispatch(decremented())} className="text-2xl text-blue-500 w-24px h-24px leading-24px cursor-pointer bg-blue-200  dark:bg-light-400 border-solid border-orange-600 border rounded-4px text-center">-</div>
      </div>
      <Outlet />
    </div>
  )
}