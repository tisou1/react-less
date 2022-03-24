import { useSelector, useDispatch } from 'react-redux'
import { decremented, incremented } from '~/store/reducers/counterSlice'
import { change } from '~/store/reducers/booleanSlice'
import { RootState } from '../store'

export default () => {
  const { counter, booleaner} = useSelector((state: RootState) => state)
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
  return(
    <div 
    className="text-emerald-400 text-tisou1-pri text-2xl" 
    >

      <div className='p-4 bg-blue-300 text-3xl'>
        {booleaner.value + ''}
        <div onClick={() => dispatch(change())} className='text-orange-400'>改变</div>
      </div>
    <div  onClick={() => setCount(count => count + 1)}>  根路径...... {count} </div>
    <div className="text-2xl text-orange-400">{counter.value}</div>
    <div onClick={() => dispatch(incremented())} className="text-2xl text-blue-500">+</div>
    <div onClick={() => dispatch(decremented())} className="text-2xl text-blue-500">-</div>
    </div>
  )
}