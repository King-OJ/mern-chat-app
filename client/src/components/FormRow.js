import React from 'react'

export default function FormRow({ label, name, type, value}) {
  return (
    <div className="relative z-0">
        <input type={type} id={name} className="block py-2.5 px-0 w-full text-xs sm:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-[#735FCD] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#735FCD] peer" placeholder=" " />
        <label htmlFor={name} className="left-0 font-semibold capitalize absolute text-xs sm:text-sm text-[#735FCD] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#735FCD] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{label}</label>
    </div>
  )
}
