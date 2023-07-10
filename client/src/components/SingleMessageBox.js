import React from 'react'
import SingleMessage from './SingleMessage'
import ChatIcon from './ChatIcon'
import { useAppContext } from '../context/appContext'


export default function SingleMessageBox({message, index}) {
  const { user } = useAppContext()
 
  return (
    <div className={message.sender._id === user._id ? "self-end" : "self-start flex items-end space-x-2"}>
        <div className={message.showAvatar ? 'visible' : 'invisible'}><ChatIcon user={message.sender} /></div>
        <SingleMessage text={message.message} message={message} />
    </div>
  )
}
