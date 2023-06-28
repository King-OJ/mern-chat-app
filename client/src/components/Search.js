import React, { useEffect, useMemo, useState } from 'react'
import Loader from "./Loader"
import { useAppContext } from '../context/appContext'

export default function Search() {

const { search , handleSearchChng, searchUsers, searchSuggestions, selectChatMate, searchUsersLoading} = useAppContext()

const [localSearch, setLocalSearch] = useState('')

function debounce (){
    let timeoutID;

    return (e)=>{
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(()=>{
        handleSearchChng(e.target.value)
      }, 1000)
    }
  }

const optimizedDebounce = useMemo(()=>debounce(), [])

useEffect(() => {
    if(search){
        searchUsers()
    }
    // eslint-disable-next-line 
  }, [ search ])


  

  return (
    <div className="flex gap-2 items-center relative">
        <input type="text" value={localSearch} onChange={optimizedDebounce} className='outline-none pb-1 bg-transparent placeholder:text-sm placeholder:text-[#735FCD] border-[#735FCD] border-b-2 min-w-[260px]' placeholder='Enter a username to search' />
        
        {   
        search &&
            <ul className={"absolute w-full flex gap-3 top-12 left-0 p-2 rounded-lg flex-wrap bg-white overflow-x-auto max-w-md"}>
                {
                    searchUsersLoading ?  <div className='mx-auto'><Loader /></div> :
                    searchSuggestions.length > 0 ? searchSuggestions.map((suggestion, index)=>{
                        return <button onClick={()=> selectChatMate(suggestion._id) } key={index} className='bg-[#735FCD] flex items-center rounded-md text-white font-semibold px-1 py-[1px] text-xs'>{suggestion.username}</button>
                    })
                    :
                    <div className='text-xs font-semibold mx-auto tracking-wider'>No username with <span className='font-extrabold'>{`${search}`}</span> found!</div>
                }
            </ul>
        }
    </div>
  )
}
