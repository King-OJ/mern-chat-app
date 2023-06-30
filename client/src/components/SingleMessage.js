import React from 'react'
import { useAppContext } from '../context/appContext'

export default function SingleMessage({message}) {
  const { user } = useAppContext()
  return (
    <div className={message.sender._id === user._id  ? 'bg-[#F4F3FB] px-[5px] py-[2px] text-black rounded-md max-w-sm' :'px-[5px] py-[2px] text-sm md:text-base bg-[#735FCD] text-white rounded-md max-w-sm'}>{message.message}</div>
  )
}
