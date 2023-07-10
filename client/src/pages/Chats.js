import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Logo from '../components/Logo'
import { FaBell, FaUser, FaAngleDown } from 'react-icons/fa'
import ChatList from '../components/ChatList'
import Chat from '../components/Chat'
import Modal from '../components/Modal'
import { useAppContext } from '../context/appContext'

export default function Chats() {

  const { logout, showAlert, user, getAllChats} = useAppContext()


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = (type)=>{
    setModalType(type)
    setIsModalOpen(true)
    setTimeout(()=>{
      setShowModal(true)
    }, 300)
    }

  const closeModal = ()=>{
    setShowModal(false)
    setTimeout(()=>{
      setShowLogout(false)
      setIsModalOpen(false)
    }, 300)
    setModalType('')
    }

    useEffect(() => {
      getAllChats();
      // eslint-disable-next-line
    }, [])
  

  return (
    <section className='sm:px-6 md:px-10 relative h-screen'>
      {isModalOpen && <Modal modalType={modalType} showModal={showModal} closeModal={closeModal} user={user} />}
      <div className="max-w-7xl mx-auto px-4 relative h-full">
        <header className='h-[8%]'>
          <div className="flex justify-between items-center h-full">
            <div className="hidden md:block">
              <Search />
            </div>
            <Logo />
            <div className="grid grid-flow-col gap-3 items-center relative">
              <button onClick={()=>openModal('notification')} className='text-[#735FCD]'><FaBell size={22}/></button>

              <div onClick={()=>setShowLogout(!showLogout)} className="flex space-x-2 items-center px-3 py-[3px] rounded-md bg-white shadow-md  hover:bg-opacity-70 transition duration-200">
                <button className="bg-[#e5e6e9] grid place-content-center overflow-hidden h-4 w-4 md:h-6 md:w-6 rounded-full">
                  <FaUser size={22} className='mt-1 text-[#735FCD]'/>
                </button>
                <button >
                  <FaAngleDown size={22} className='text-[#735FCD]'/>
                </button>
              </div>

              {showLogout && 
              <div className="bg-neutral-50 z-30 font-bold text-[#735FCD] rounded-md shadow-lg divide-[#735FCD] divide-y-2 absolute top-9 left-0 right-0">
                <button onClick={()=>openModal('profile')} className="w-full rounded-tl-md rounded-tr-md py-2 text-center  hover:bg-[#dfdfe0] transition duration-200">My Profile</button>
                <button onClick={async ()=>{ await logout().then((msg)=> showAlert('success', msg) ) }} className="w-full rounded-bl-md rounded-br-md py-2 text-center  hover:bg-[#dfdfe0] transition duration-200">Log out</button>
              </div>}
            </div>

            
          </div>
          <div className="md:hidden mb-4 flex justify-center">
            <Search />
          </div>
        </header>

        <main className='h-[92%]'>
          <div className="py-10 h-[90%] grid grid-cols-3 gap-6">
            
              
              <ChatList openModal={openModal}  />
              <Chat openModal={openModal}/>
              
              
          </div>
        </main>
      </div>
    </section>
  )
}
