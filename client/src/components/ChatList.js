import React from 'react'
import { FaPlus } from 'react-icons/fa'
import ChatIcon from './ChatIcon'
import { useAppContext } from '../context/appContext'

export default function ChatList( { openModal }) {

  const { openChat, activeChats, selectedChatID, user } = useAppContext()
  

  return (
    <div className='hidden lg:block w-[35%] h-[90%]'>
      <header className="flex items-center justify-between px-2">
        <h4 className='font-extrabold text-[#735FCD]'>My Chats</h4>
        <button onClick={()=>{openModal('newGroupChat')}} className="tracking-wider font-semibold text-white bg-[#735FCD] px-3 py-1 rounded-md gap-2 flex items-center hover:bg-opacity-70 transition">
          New Group Chat <FaPlus size={16} />
        </button>
      </header>

      <ul className="overflow-y-auto h-full mt-4 p-2 bg-white rounded-md shadow-md space-y-3 mb-10">
        
          { activeChats.length > 0 ? activeChats.map((chat,i)=> {
            let chatMate
            if(chat.isGroupChat){

            }
            chatMate = chat.users.find((chatMate) => chatMate._id !== user._id )
            
            return (
              <li key={i} className="w-full" onClick={()=>{openChat(chat._id, chatMate._id, chat.isGroupChat)}}>
                <button className={chat._id === selectedChatID ? "text-left px-2 py-3 text-white bg-[#735FCD] w-full rounded-md flex justify-between self-center  font-semibold": "text-left px-2 py-3 transition hover:bg-[#735FCD] hover:text-white bg-[#ede8f4] w-full rounded-md flex justify-between self-center  font-semibold"}><div className='flex gap-2'><ChatIcon user={chatMate} />{chat.isGroupChat ? chat.chatName : chatMate.username}</div> {chat.isGroupChat && <div className='italic text-xs justify-end self-end'>Group Chat</div>}</button>
              </li>
            )
          }):
          <div className='font-bold max-w-xs mx-auto text-[#735FCD] text-center h-full grid place-content-center'>No active chats! Search for a chatmate and click on it!</div>

        }
        
      </ul>
    </div>
  )
}
