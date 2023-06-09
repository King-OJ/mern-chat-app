import React from 'react'

export default function FormRow({id, label, name, type, value, handleChange}) {
  return (
    <div className="relative z-0">
        <input type={type} name={name} id={id || name } onChange={handleChange} value={value} className="block py-2.5 px-0 w-full text-xs sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-[#735FCD] appearance-none focus:outline-none focus:ring-0 focus:border-[#735FCD] peer" placeholder=" " />
        <label htmlFor={id || name } className="left-0 font-semibold capitalize absolute text-xs sm:text-base text-[#735FCD] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#735FCD]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{label}</label>
    </div>
  )
}
