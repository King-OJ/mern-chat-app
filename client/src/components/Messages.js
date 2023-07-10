import React, { useEffect, useRef } from 'react'
import SingleMessageBox from './SingleMessageBox'
import { useAppContext } from '../context/appContext'
import { showAvatar } from '../config/chatLogics'

export default function Messages() {
    const { messages, user } = useAppContext()
    
    const messagesWithAvatar = ()=> {
        const showDP = showAvatar(messages, user)
        return messages.map((msg,index)=>{
            return {...msg, showAvatar: showDP[index] }
        })
       
    };

    const el = useRef(null);
    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: "smooth" })
    }, [messages])

  return (
    <div className='absolute top-3 bottom-16 right-3 left-3 overflow-y-auto messages'>
        <div className="flex flex-col space-y-3">
            {
                messagesWithAvatar().map((message, i)=>{
                    return <SingleMessageBox key={i} message={message} index={i}/>
                })
            }
            <div id={'el'} ref={el} />  
        </div>
    </div>
  )
}
