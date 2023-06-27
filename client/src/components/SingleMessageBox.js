import React from 'react'
import SingleMessage from './SingleMessage'
import ChatIcon from './ChatIcon'
import { useAppContext } from '../context/appContext'

export default function SingleMessageBox({myText, message}) {
  const { openedChatUser } = useAppContext()
  return (
    <div className={myText ? "self-end" : "self-start flex items-center gap-2"}>
        {!myText && <ChatIcon user={openedChatUser} />}
        <SingleMessage text={message} myText={myText} />
    </div>
  )
}
