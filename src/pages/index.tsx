
export default () => {

  const [count, setCount] = useState<number>(0)
  const ref = useRef<any>(null)
  useEffect(() => {
    console.log(ref.current);
  })
  return(
    <div 
    className="text-emerald-400 text-tisou1-pri text-2xl" 
    onClick={() => setCount(count => count + 1)}
    >
      根路径...... {count}
    </div>
  )
}