import React from 'react'
import SingleMessage from './SingleMessage'
import ChatIcon from './ChatIcon'

export default function SingleMessageBox({myText, message}) {
  return (
    <div className={myText ? "self-end" : "self-start flex items-center gap-2"}>
        {!myText && <ChatIcon />}
        <SingleMessage text={message} myText={myText} />
    </div>
  )
}
