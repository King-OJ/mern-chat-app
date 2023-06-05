import React, { useState } from 'react'
import FormRow from '../components/FormRow'
import { BsCheck } from 'react-icons/bs'

export default function Register() {

  const features = [
    {
      title: 'Going somewhere?',
      desc: 'Find a trekking partner going the same route as you.'
    },
    {
      title: 'Quick and free sign-up',
      desc: 'Enter your email address to create an account.'
    },
    {
      title: 'Kickout boredom, make happy friends!',
      desc: 'Chat privately and in groups with people.'
    },
  ]

  const details = {
    isMember: false
  }

  const [visitor, setVisitor] = useState(details)

  return (
    <section className='h-screen w-screen'>
      <div className="page h-full flex justify-center">
        <div className="h-[80%] my-auto w-full">
          
          <div className="flip-box h-full w-[90%] mx-auto relative max-w-6xl rounded-md bg-white shadow-md">  
            
            {/* flip parent box */}
            <div className={visitor.isMember ? "flip-box-inner flip": "flip-box-inner"}> 
            
              
              {/* front */}
              <div className="absolute inset-4 flex front">
                
                {/*front child box */}
                <div className="hidden sm:block w-[40%] rounded-tl-md rounded-bl-md px-2 sm:px-6 md:px-12 text-white h-full bg-gradient-to-br from-[#BFA1EA] to-[#735FCD]" >
                  <div className="flex h-full flex-col justify-center space-y-6 sm:space-y-10 md:space-y-14">
                    {
                      features.map((feature, i)=> {
                        return (
                          <div key={i} className="text-center sm:text-left flex flex-col gap-1 sm:gap-2 ">
                            <div className="h-4 w-4 mx-auto sm:mx-0 sm:h-8 sm:w-8 flex items-center justify-center rounded-full  bg-[#BFA1EA]"><BsCheck size={23} /></div>
                            <div className='text-[#F4F3FB] font-semibold text-xs sm:text-sm md:text-lg'>{feature.title}</div>
                            <div className='text-[#F4F3FB] text-xs sm:text-sm md:text-base'>{feature.desc}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                  
                {/* front child box */}
                <div className="w-full sm:w-[60%] h-full px-3 sm:px-6 md:px-12">
                  <form className="flex h-full flex-col justify-center">
                    <h2 className='mb-10 text-4xl tracking-widest font-extrabold text-center  inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#BFA1EA] to-[#735FCD]'>Trekkers</h2>
                    <h3 className='font-semibold text-center mb-4 sm:mb-8 text-[#84899C]'>Create your account</h3>
                    <div className="relative space-y-10 md:space-y-14">
                    <FormRow label='username' name='username' type='text' value='' />
                    <FormRow label='email' name='email' type='email' value='' />
                    <FormRow label='password' name='password' type='password' value='' />
                    <div className="text-xs sm:text-sm text-[#84899C] flex gap-1">Already have an account?<span className='cursor-pointer  bg-[#BFA1EA] text-white py-[3px] px-2 text-xs font-semibold rounded-lg animate-bounce' onClick={()=>setVisitor({...visitor, isMember: !visitor.isMember}) }>Login</span></div>
                    <button type='submit' className='bg-[#735FCD] text-sm md:text-base font-semibold text-white rounded-md shadow-lg w-full py-[6px] sm:py-2 md:py-3 tracking-wider'>Sign Up</button>
                    </div>
                  </form>
                </div>
              
              </div>

              {/* back */}
              <div className="absolute inset-4 flex flex-row-reverse back">
                
                {/* back child box */}
                <div className="hidden sm:block w-[40%] rounded-tr-md rounded-br-md px-2 sm:px-6 md:px-12 text-white h-full bg-gradient-to-br from-[#BFA1EA] to-[#735FCD]" >
                  <div className="flex h-full flex-col justify-center space-y-6 sm:space-y-10 md:space-y-14">
                    {
                      features.map((feature, i)=> {
                        return (
                          <div key={i} className="text-center sm:text-left flex flex-col gap-1 sm:gap-2 ">
                            <div className="h-4 w-4 mx-auto sm:mx-0 sm:h-8 sm:w-8 flex items-center justify-center rounded-full  bg-[#BFA1EA]"><BsCheck size={23} /></div>
                            <div className='text-[#F4F3FB] font-semibold text-xs sm:text-sm md:text-lg'>{feature.title}</div>
                            <div className='text-[#F4F3FB] text-xs sm:text-sm md:text-base'>{feature.desc}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                  
                {/* back child box */}
                <div className="w-full sm:w-[60%] h-full px-3 sm:px-6 md:px-12">
                  <form className="flex h-full flex-col justify-center">
                    <h2 className='mb-10 text-4xl tracking-widest font-extrabold text-center  inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#BFA1EA] to-[#735FCD]'>Trekkers</h2>
                    <h3 className='font-semibold text-center mb-4 sm:mb-8 text-[#84899C]'>Login to your account</h3>
                    <div className="space-y-10 md:space-y-14">
                    <FormRow label='email' name='email' type='email' value='' />
                    <FormRow label='password' name='password' type='password' value='' />
                    <div className="text-xs sm:text-sm text-[#84899C] flex  gap-1">Don't have an account yet?<span className='cursor-pointer  bg-[#BFA1EA] text-white py-[3px] px-2 text-xs font-semibold rounded-lg animate-bounce' onClick={()=>setVisitor({...visitor, isMember: !visitor.isMember}) }>Sign Up</span></div>
                    <button type='submit' className='bg-[#735FCD] text-sm md:text-base font-semibold text-white rounded-md shadow-lg w-full py-[6px] sm:py-2 md:py-3 tracking-wider'>Login</button>
                    </div>
                  </form>
                </div>
              
              </div>

            </div>


          </div>
        </div>


        
      </div>
    </section>
  )
}
