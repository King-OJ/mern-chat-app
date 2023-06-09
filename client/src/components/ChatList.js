import React from 'react'
import { FaPlus } from 'react-icons/fa'
import ChatIcon from './ChatIcon'

export default function ChatList() {
  return (
    <div className='w-[35%] h-[90%]'>
      <header className="flex items-center justify-between px-2">
        <h4 className='font-extrabold'>My Chats</h4>
        <button className="font-semibold bg-[#e5e6e9] px-3 py-1 rounded-md gap-2 flex items-center hover:bg-opacity-70 transition">
          New Group Chat <FaPlus size={16} />
        </button>
      </header>

      <ul className="h-full mt-4 p-2 bg-[#e5e6e9] rounded-md space-y-3 mb-10">
        <li className="w-full">
          <button className="text-left px-2 py-3 bg-[#d9dadb] w-full rounded-md flex items-center gap-2"><ChatIcon /> Clement</button>
        </li>
        <li className="w-full">
          <button className="text-left px-2 py-3 bg-[#d9dadb] w-full rounded-md flex items-center gap-2"><ChatIcon /> Clement</button>
        </li>
        <li className="w-full">
          <button className="text-left px-2 py-3 bg-[#d9dadb] w-full rounded-md flex items-center gap-2"><ChatIcon /> Clement</button>
        </li>
        <li className="w-full">
          <button className="text-left px-2 py-3 bg-[#d9dadb] w-full rounded-md flex items-center gap-2"><ChatIcon /> Clement</button>
        </li>
        
      </ul>
    </div>
  )
}
