import React, { useEffect }  from 'react'
import { FaPlus } from 'react-icons/fa'
import ChatIcon from './ChatIcon'
import Loader from './Loader'
import { useAppContext } from '../context/appContext'

export default function ChatList() {

  const { openChat, allUsers, getUsers, allUsersLoading } = useAppContext()
  
  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <div className='w-[35%] h-[90%]'>
      <header className="flex items-center justify-between px-2">
        <h4 className='font-extrabold'>My Chats</h4>
        <button className="font-semibold bg-[#e5e6e9] px-3 py-1 rounded-md gap-2 flex items-center hover:bg-opacity-70 transition">
          New Group Chat <FaPlus size={16} />
        </button>
      </header>

      <ul className="overflow-y-auto h-full mt-4 p-2 bg-[#e5e6e9] rounded-md space-y-3 mb-10">
        {
          allUsersLoading ? <div className='h-full grid place-content-center'>
            <div className="flex space-y-2 flex-col items-center">
              <Loader />
              <div className="text-sm font-semibold">Loading users...</div>
            </div>
            </div>
          :
          allUsers.map((user,i)=> {
            return (
              <li key={i} className="w-full" onClick={()=>{openChat(user._id)}}>
                <button className="text-left px-2 py-3 bg-[#d9dadb] w-full rounded-md flex items-center gap-2"><ChatIcon username={user.username} />{user.username}</button>
              </li>
            )
          })
        }
        
      </ul>
    </div>
  )
}
