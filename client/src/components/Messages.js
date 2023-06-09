import React, { useEffect, useRef } from 'react'
import SingleMessageBox from './SingleMessageBox'
import { useAppContext } from '../context/appContext'

export default function Messages() {
    const { messages } = useAppContext()
    const el = useRef(null);

    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: "smooth" })
    }, [messages])

  return (
    <div className='absolute top-3 bottom-16 right-3 left-3 overflow-y-auto messages'>
        <div className="flex flex-col gap-3">
            {
                messages.map((message, i)=>{
                    return <SingleMessageBox key={i} myText={message.myText} message={message.text}/>
                })
            }
            <div id={'el'} ref={el} />  
        </div>
    </div>
  )
}
