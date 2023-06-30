import React from 'react'
import SingleMessage from './SingleMessage'
import ChatIcon from './ChatIcon'
import { useAppContext } from '../context/appContext'

export default function SingleMessageBox({message}) {
  const { user } = useAppContext()
  return (
    <div className={message.sender._id === user._id ? "self-end" : "self-start flex items-center gap-2"}>
        {message.sender._id !== user._id && <ChatIcon user={message.sender} />}
        <SingleMessage text={message.message} message={message} />
    </div>
  )
}
