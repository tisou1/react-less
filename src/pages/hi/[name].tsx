import { useParams } from 'react-router'

export default function Name() {
  const { name } = useParams()
  
  return (
    <div className="text-emerald-400  text-2xl pt-16 sm:pt-1 dark:bg-black dark:text-white">
      <h1>Hi {name}</h1>
    </div>
  )

}