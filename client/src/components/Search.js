import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'

export default function Search() {

  const { search , handleSearchChng, getUsers} = useAppContext()

  return (
    <div className="flex gap-2 items-center">
        <input type="text" value={search} onChange={(e)=>{ handleSearchChng(e.target.value)}} className='outline-none p-2 bg-transparent border-b-2 min-w-[240px]' placeholder='Search username' />
        <button onClick={()=> getUsers()} className='p-2 hover:shadow-lg transition duration-200 flex items-center justify-center bg-[#e5e6e9] rounded-full'>
            <FaSearch size={19}/>
        </button>
    </div>
  )
}
