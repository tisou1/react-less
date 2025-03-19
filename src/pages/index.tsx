import {useNavigate} from 'react-router'
import React, { useState, useEffect, useRef } from 'react'
import { clsx } from 'clsx'

const Index = () => {

  const [name, setName] = useState('')
  const nameRef = useRef('')
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/hi/${name}`)
  }

  const hancleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    nameRef.current = e.target.value
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!!name && e.key === 'Enter' ) {
      handleClick()
    }
  }


  return (
    <div
      className="flex justify-center mt-12 text-emerald-400  text-2xl pt-16 sm:pt-1 dark:bg-black dark:text-white"
    >
      <input 
        className='border border-gray-100 outline-0 px-4 py-2 rounded-xl mr-2' 
        placeholder="What's your name?" 
        type='text' 
        onChange={hancleChange}
        onKeyDown={handleKeyDown}
      />
      <button className={clsx('border border-amber-100 px-5 py-1 rounded-xl',{'cursor-pointer':!!name})} onClick={handleClick} disabled={!name} >GO</button>
    </div>
  )
}

export default Index
