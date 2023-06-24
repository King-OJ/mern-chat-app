import React from 'react'

export default function ChatIcon({username}) {
  return (
    <div className='uppercase p-1 text-white h-7 w-7 grid place-content-center bg-slate-600 rounded-full font-semibold tracking-wider'>{username?.slice(0, 2)}</div>
  )
}
