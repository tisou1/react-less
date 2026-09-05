import { useParams } from 'react-router'

export default function Name() {
  const { name } = useParams()

  return (
    <div className="text-emerald-400  text-2xl pt-16 sm:pt-1">
      <h1>
        Hi
        {name}
      </h1>
    </div>
  )
}
