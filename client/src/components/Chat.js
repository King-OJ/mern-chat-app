import React, { useEffect } from 'react'
import { FaArrowLeft, FaCaretRight, FaEye } from 'react-icons/fa'
import Messages from './Messages'
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify'

import io from "socket.io-client"

export default function Chat() {
  // let socket
  // useEffect(() => {
  //   socket = io('/')

  // }, [])
  

  const { newMsg, handleMsgChng, sendMsg } = useAppContext()
  
  // function sendMsg(msg){
  //   socket.emit('chat message', msg)
  // }

  function handleSubmit(e){
    e.preventDefault()
    if(!newMsg){
      toast.error('Enter a message first')
      return
    }
    sendMsg()
  }

  return (
    <div className='flex-1 h-[90%]'>
      <header>
        <div className="flex justify-between items-center">
          <button className='lg:hidden bg-[#e5e6e9] p-2 rounded-md hover:bg-opacity-70 transition'>
            <FaArrowLeft size={16} />
          </button>
          <h6 className='font-semibold'>Clement</h6>
          <button className='bg-[#e5e6e9] p-2 rounded-md hover:bg-opacity-70 transition'>
            <FaEye size={16} />
          </button>
        </div>
      </header>
      <div className="h-full relative mt-4 p-2 bg-[#e5e6e9] rounded-md">
        <Messages />
        <div className='absolute bottom-3 right-3 left-3 flex gap-2 items-center'>
          <input type="text" className="flex-1 p-2 outline-none rounded-full  bg-[#d9dadb] overflow-y-auto" value={newMsg} onChange={(e)=>handleMsgChng(e.target.value)} placeholder='Enter a message' />
          <button onClick={handleSubmit} type='button' className='bg-[#d9dadb] p-[5px] rounded-full hover:bg-opacity-70 transition'><FaCaretRight className='text-blue-500' size={28} /></button>
        </div>
      </div>
    </div>
  )
}
