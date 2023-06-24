import React, { useState } from 'react'
import Search from '../components/Search'
import Logo from '../components/Logo'
import { FaBell, FaUser, FaAngleDown } from 'react-icons/fa'
import ChatList from '../components/ChatList'
import Chat from '../components/Chat'
import Modal from '../components/Modal'
import { useAppContext } from '../context/appContext'

export default function Chats() {

  const { logout, showAlert } = useAppContext()


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [modalType, setModalType] = useState('profile')
  

  return (
    <section className='sm:px-6 md:px-10 relative h-screen'>
      {isModalOpen && <Modal modalType={modalType} showModal={showModal} closeModal={()=>{
        setShowModal(false)
        setTimeout(()=>{
          setShowLogout(false)
          setIsModalOpen(false)
        }, 300)
        }} />}
      <div className="max-w-7xl mx-auto px-4 relative h-full">
        <header className='h-[8%]'>
          <div className="flex justify-between items-center h-full">
            <div className="hidden md:block">
              <Search />
            </div>
            <Logo />
            <div className="flex gap-3 items-center relative">
              <button onClick={()=>{
                  setModalType('notification')
                  setIsModalOpen(true)
                  setTimeout(()=>{
                    setShowModal(true)
                  }, 300)
                  }}><FaBell size={22}/></button>

              <div onClick={()=>setShowLogout(!showLogout)} className="flex gap-2 items-center px-3 py-[3px] rounded-md bg-[#b5b6b9] hover:shadow-lg  hover:bg-opacity-70 transition duration-200">
                <button className="bg-[#e5e6e9] grid place-content-center overflow-hidden h-4 w-4 md:h-6 md:w-6 rounded-full">
                  <FaUser size={22} className='mt-1'/>
                </button>
                <button >
                  <FaAngleDown size={22}/>
                </button>
              </div>

              {showLogout && 
              <div className="bg-[#e5e6e9] rounded-md shadow-lg divide-black divide-y-2 absolute top-9 left-0 right-0">
                <button onClick={()=>{
                  setModalType('profile')
                  setIsModalOpen(true)
                  setTimeout(()=>{
                    setShowModal(true)
                  }, 300)
                  }} className="w-full rounded-tl-md rounded-tr-md py-2 text-center  hover:bg-[#b5b6b9] transition duration-200">My Profile</button>
                <button onClick={async ()=>{ await logout().then((msg)=> showAlert('success', msg) ) }} className="w-full rounded-bl-md rounded-br-md py-2 text-center  hover:bg-[#b5b6b9] transition duration-200">Log out</button>
              </div>}
            </div>

            
          </div>
          <div className="md:hidden mb-4 flex justify-center">
            <Search />
          </div>
        </header>

        <main className='h-[92%]'>
          <div className="my-10 h-full flex gap-8">
            <ChatList />
            <Chat />
          </div>
        </main>
      </div>
    </section>
  )
}
