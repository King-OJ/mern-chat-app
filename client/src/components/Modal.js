import React from 'react'
import { FaBell, FaTimes } from 'react-icons/fa'
import FormRow from './FormRow'
import { useAppContext } from '../context/appContext'

export default function Modal({ closeModal, showModal, modalType }) {
  const  { user: {username, email, avatar, bio, country}, openedChatMate, isGroupChat, groupMembers, groupName, groupAdmin }  = useAppContext()
  return (
    <div className='absolute inset-0 z-10 bg-neutral-800 h-full bg-opacity-60 w-screen'>
        <div className="flex justify-center items-center h-full w-full">
            <div className={ showModal ? "transform translate-y-0 opacity-100 transition duration-300 max-w-2xl w-[90%] bg-white rounded-md p-6" : "transform translate-y-full opacity-0 transition duration-300 max-w-2xl w-[90%] bg-white rounded-md p-6"}>
                <button onClick={()=>closeModal()} className="bg-[#735FCD] text-white hover:bg-opacity-70 transition p-1 rounded-full">
                <FaTimes size={20}/>
                </button>
                {
                  modalType === 'profile' &&
                  
                  <div className="mt-6 text-center flex flex-col items-center gap-10">
                    <div>{username}</div>
                    <img src={avatar} alt="person" />
                    
                    <div className="text-lg flex flex-col ">Email:<span className='font-semibold'>{email}</span></div>
                    <div className="text-lg flex flex-col ">About me:<span className='font-semibold'>{bio}</span></div>
                    <div className="text-lg flex flex-col ">Location:<span className='font-semibold'>{country}</span></div>

                </div> } 
                {
                  modalType === 'openedChatProfile' &&
                  
                  (isGroupChat ?
                  <div className="mt-6 text-center flex flex-col items-center gap-10">
                    <div className='font-semibold tracking-wider'> <span className='font-extrabold'>Group Name :</span> {groupName}</div>
                    <div className='font-semibold tracking-wider space-y-2'> <span className='font-extrabold'>Group Members :</span> <ul className='flex gap-2 flex-wrap'>

                      {groupMembers.map((members)=> {
                        return (
                          <li className='px-2 py-1 rounded-md bg-[#ede8f4]'>
                            {members.username}
                          </li>
                        )
                      })}
                      </ul> </div>
                      <div className='font-semibold tracking-wider'> <span className='font-extrabold'>Group Admin :</span><div className='px-2 py-1 text-white rounded-md bg-[#735FCD]'>
                            {groupAdmin.username}
                          </div></div>
                  </div>

                  :

                  <div className="mt-6 text-center flex flex-col items-center gap-10">
                    <div className='font-semibold tracking-wider'>{openedChatMate.username}</div>
                    <img src={openedChatMate.avatar} alt="person" />
                    
                    <div className="text-lg flex flex-col ">Email:<span className='font-semibold'>{openedChatMate.email}</span></div>
                    <div className="text-lg flex flex-col ">About me:<span className='font-semibold'>{openedChatMate.bio}</span></div>
                    <div className="text-lg flex flex-col ">Location:<span className='font-semibold'>{openedChatMate.country}</span></div>

                  </div>
                  ) 
                
                } 
                {
                 modalType === 'notification' && 
                <div className="mt-6 flex flex-col items-center gap-10 w-full">
                  <h6 className='font-semibold md:text-xl text-[#735FCD]'>Notifications</h6>
                  <ul className='w-full space-y-3'>
                    <li className='p-2 bg-[#ede8f4] font-semibold rounded-md w-full flex items-center gap-3'><FaBell /> Welcome to my chat app. This is a fullstack MERN App.</li>
                    <li className='p-2 bg-[#ede8f4] font-semibold rounded-md w-full flex items-center gap-3'><FaBell /> This appliction was built by Clement Ojiguo</li>
                  </ul>
                </div>
                }

                {
                 modalType === 'newGroupChat' && 
                <div className="mt-6 flex flex-col items-center gap-10 w-full">
                  <h6 className='font-semibold md:text-xl text-[#735FCD]'>Create Group Chat</h6>
                  <form action="
                  " className="w-full space-y-8">

                    <FormRow label='Enter group name :' type="text" name="newGroupName" />
                    <div>
                      <label className='text-[#735FCD] font-semibold'>Add group members :</label>
                    </div>
                    <div className="flex justify-center">
                      <button className="tracking-wider w-3/4 px-3 py-2 bg-gradient-to-br from-[#BFA1EA] to-[#735FCD] font-semibold text-white rounded-md">Create group</button>
                    </div>
                  </form>
                </div>
                }
            </div>
        </div>
    </div>
  )
}
