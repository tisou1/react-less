import { useSelector, useDispatch } from 'react-redux'
import { decremented, incremented } from '@/store/slice'
import { RootState } from '../store'

export default () => {
  const counter = useSelector((state: RootState) => state.counter)
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
    <div  onClick={() => setCount(count => count + 1)}>  根路径...... {count} </div>
    <div className="text-2xl text-orange-400">{counter.value}</div>
    <div onClick={() => dispatch(incremented())} className="text-2xl text-blue-500">+</div>
    <div onClick={() => dispatch(decremented())} className="text-2xl text-blue-500">-</div>
    </div>
  )
}