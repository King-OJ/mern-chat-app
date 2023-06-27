import React from 'react'
import { useAppContext } from '../context/appContext'

export default function ChatIcon({user}) {

  const { selectedChatMateID } = useAppContext()

  return (
    <div className={user._id === selectedChatMateID ? 'uppercase p-1 text-[#735FCD] h-7 w-7 grid place-content-center bg-white rounded-full font-semibold tracking-wider' : 'uppercase p-1 text-white h-7 w-7 grid place-content-center bg-[#735FCD] rounded-full font-semibold tracking-wider'}>{user.username.slice(0, 2)}</div>
  )
}
