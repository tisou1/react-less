import type { ChangeEvent, KeyboardEvent } from 'react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

function Index() {
  const [name, setName] = useState('')
  const nameRef = useRef('')
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/hi/${name}`)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    nameRef.current = e.target.value
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!!name && e.key === 'Enter') {
      handleClick()
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pt-16 sm:pt-1">
      <Input
        className="w-64"
        placeholder="What's your name?"
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleClick} disabled={!name}>GO</Button>
    </div>
  )
}

export default Index
