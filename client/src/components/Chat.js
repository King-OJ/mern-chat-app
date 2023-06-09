import React from 'react'
import { FaArrowLeft, FaCaretRight, FaEye } from 'react-icons/fa'
import Messages from './Messages'
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify'

export default function Chat() {

  const { newMsg, handleMsgChng, sendMsg } = useAppContext()
  
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
          <input type="text" className="flex-1 p-2 outline-none rounded-md  bg-[#d9dadb] overflow-y-auto" value={newMsg} onChange={(e)=>handleMsgChng(e.target.value)} placeholder='Enter a message' />
          <button onClick={handleSubmit} type='button' className='bg-[#d9dadb] p-2 rounded-md hover:bg-opacity-70 transition'><FaCaretRight size={22} /></button>
        </div>
      </div>
    </div>
  )
}
