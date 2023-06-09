import React from 'react'

export default function SingleMessage({text, myText}) {
  return (
    <div className={myText ? 'bg-[#F4F3FB] px-2 py-1 text-black rounded-md max-w-sm' :'px-2 py-1  bg-[#BFA1EA] text-black rounded-md max-w-sm'}>{text}</div>
  )
}
