import React, { useEffect } from 'react'
import { FaArrowLeft, FaCaretRight, FaEye } from 'react-icons/fa'
import Messages from './Messages'
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify'
import { socket } from '../socket'

export default function Chat({ openModal }) {
  

  const { newMsg, handleMsgChng, groupMembers, groupName, openedChatMate, messages, selectedChatID, isGroupChat } = useAppContext()
  
  function sendMsg(msg){
    console.log(msg);
    socket.emit('chat message', msg)
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!newMsg){
      toast.error('Enter a message first')
      return
    }
    sendMsg(newMsg)
  }

  useEffect(() => {
    console.log(selectedChatID);
  }, [selectedChatID])
  

  return (
    <div className='flex-1 h-[90%]'>
      <header>
        <div className="flex justify-between items-center">
          <button className='lg:hidden bg-white p-2 rounded-md hover:bg-opacity-70 transition'>
            <FaArrowLeft size={16} className='text-[#735FCD]'/>
          </button>
          <h6 className='font-extrabold'>{isGroupChat ? groupName : openedChatMate?.username}</h6>
        {(openedChatMate || groupMembers) &&
          <button onClick={()=>openModal('openedChatProfile')} className='bg-white shadow-md p-2 rounded-md hover:bg-opacity-70 transition'>
            <FaEye size={16} className='text-[#735FCD]' />
          </button>}
        </div>
      </header>
      <div className="h-full relative mt-4 p-2 bg-neutral-50 rounded-md shadow-md">
        {selectedChatID ?
        <>
          {messages && <Messages />}
          <div className='absolute bottom-3 right-3 left-3 flex gap-2 items-center'>
            <input type="text" className="flex-1 px-3 py-[5px] rounded-full bg-transparent outline-[#BFA1EA] outline outline-1 overflow-y-auto placeholder:text-slate-700" value={newMsg} onChange={(e)=>handleMsgChng(e.target.value)} placeholder='Enter a message' />
            <button onClick={handleSubmit} type='button' className='bg-[#735FCD] p-[5px] rounded-full hover:bg-opacity-70 transition'><FaCaretRight className='text-white' size={28} /></button>
          </div>
        </>
        : 
        <div className='font-bold max-w-xs mx-auto text-center text-[#735FCD] h-full grid place-content-center'>No message(s) to display! Click on a user on the left to start a chatting!</div>
      }
      </div>
    </div>
  )
}
