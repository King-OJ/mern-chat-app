import React, { useState } from 'react'
import { FaUser, FaTimes } from 'react-icons/fa'

export default function Modal({ closeModal, showModal }) {

  return (
    <div className='absolute inset-0 z-10 bg-neutral-800 h-full bg-opacity-60 w-screen'>
        <div className="flex justify-center items-center h-full w-full">
            <div className={ showModal ? "transform translate-y-0 opacity-100 transition duration-300 max-w-2xl w-[90%] bg-white rounded-md p-6" : "transform translate-y-full opacity-0 transition duration-300 max-w-2xl w-[90%] bg-white rounded-md p-6"}>
                <button onClick={()=>closeModal()} className="hover:bg-neutral-300 transition p-1 rounded-full">
                <FaTimes size={20}/>
                </button>
                <div className="mt-6 text-center flex flex-col items-center gap-10">
                <div>username</div>
                <FaUser size={40}/>
                <div className="text-lg">Email: test@gmail.com </div>
                </div>
            </div>
        </div>
    </div>
  )
}