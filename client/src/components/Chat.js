import React, { useEffect } from 'react'
import { FaArrowLeft, FaCaretRight, FaEye } from 'react-icons/fa'
import Messages from './Messages'
import Loader from './Loader'
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify'
import { socket } from '../socket'

export default function Chat({ openModal }) {
  

  const { newMsg, sendMsg, handleMsgChng, groupMembers, groupName, openedChatMate, messages, messagesLoading , selectedChatID, isGroupChat, activeChats } = useAppContext()
  
  // function sendMsg(msg){
  //   console.log(msg);
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

  useEffect(() => {

  }, [messages])
  

  return (
    <div className='col-span-2  h-full'>
      <header>
        <div className="flex justify-between items-center">
          <button className='lg:hidden bg-white p-2 rounded-md hover:bg-opacity-70 transition'>
            <FaArrowLeft size={16} className='text-[#735FCD]'/>
          </button>
          <h6 className='font-extrabold'>{isGroupChat ? groupName : openedChatMate?.username}</h6>
        {
          <button onClick={()=>openModal('openedChatProfile')} className={openedChatMate || groupMembers.length > 0 ? 'bg-white visible shadow-md p-2 rounded-md hover:bg-opacity-70 transition' : "invisible"}>
            <FaEye size={16} className='text-[#735FCD]' />
          </button>}
        </div>
      </header>
      <div className="h-full relative mt-4 p-2 bg-neutral-50 rounded-md shadow-md">
        {selectedChatID ?
        <>
          {messagesLoading ? <div className='flex items-center justify-center flex-col h-full'><Loader /><div className='tracking-widest opacity-20'>Getting messages</div></div> : messages.length > 0 ? <Messages /> : <div className='grid place-content-center h-full font-semibold tracking-widest opacity-20'>Start chatting!</div>}
          
          <div className='absolute bottom-3 right-3 left-3 flex space-x-2 items-center'>
            <div className=" flex-1 w-full border border-[#d4c5e9] rounded-full hover:border-[#BFA1EA]">
                <input type="text" className="w-full outline-none px-3 py-[5px] bg-transparent overflow-y-auto placeholder:text-slate-700" value={newMsg} onChange={(e)=>handleMsgChng(e.target.value)} placeholder='Enter a message' />  
            </div>
            <button onClick={handleSubmit} type='button' className='bg-[#735FCD] p-[5px] rounded-full hover:bg-opacity-70 transition'><FaCaretRight className='text-white' size={28} /></button>
          </div>
        </>
        : 
        (activeChats ?
          <div className='font-bold max-w-xs mx-auto text-center text-[#735FCD] h-full grid place-content-center'>No message(s) to display! Click on a user on the left to start a chatting!</div>
          :
          <div className='font-bold max-w-xs mx-auto text-center text-[#735FCD] h-full grid place-content-center'>Here's your conversation box! Search for a chatmate and begin to chat!</div>
          )
        }
      </div>
    </div>
  )
}
