import React from 'react'
import { useAppContext } from '../context/appContext'

export default function ChatIcon({user}) {

  const { selectedChatMateID } = useAppContext()

  return (
    <div className={user?._id === selectedChatMateID ? 'uppercase h-8 w-8 rounded-full ring-white' : 'uppercase h-8 w-8 ring-1 ring-[#735FCD] rounded-full'}><img src={user?.avatar} className='w-full h-full scale-100 rounded-full object-cover' alt='profile'/></div>
  )
}
