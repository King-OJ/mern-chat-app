import React, { useState } from 'react'

import FormRow from '../components/FormRow'
import { useAppContext } from '../context/appContext'
import { toast } from 'react-toastify'
import Logo from '../components/Logo'
import walkingImg from '../assets/images/walkingImg.svg'
import Loader from '../components/Loader';

export default function Register() {
  

  const features = [
    {
      title: 'Going Somewhere? Lets walk!',
      desc: 'Chat with people trekking same rout as you!!!'
    },
  ]

  const details = {
    isMember: false,
    username: '',
    email: '',
    password: '',
  }

  const [visitor, setVisitor] = useState(details)

  const {
    formLoading,
    registerUser,
    loginUser
  } = useAppContext()

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    setVisitor({...visitor, [name]: value})
  }

  function handleSubmit(e){
    e.preventDefault()
    const { username, email, password } = visitor
    if(visitor.isMember){
      if(!email || !password){
        toast.error('Please fill out all fields!')
        return;
      }
      loginUser({ email, password})
      return;
    }
    if(!email || !password || !username){
      toast.error('Please fill out all fields!')
      return;
    }
    registerUser({username, email, password })
  }

  return (
    <section className='h-screen w-screen'>
      <div className="page h-full flex justify-center">
        <div className="h-[80%] min-h-[600px] my-auto w-full">
          
          <div className="flip-box h-full w-[90%] mx-auto relative max-w-6xl rounded-md bg-white shadow-md">  
            
            {/* flip parent box */}
            <div className={visitor.isMember ? "flip-box-inner flip": "flip-box-inner"}> 
            
              
              {/* front */}
              <div className="absolute inset-4 flex front">
                
                {/*front child box */}
                <div className="hidden sm:block w-[40%] rounded-tl-md rounded-bl-md px-2 sm:px-6 md:px-12 text-white h-full bg-gradient-to-br from-[#BFA1EA] to-[#735FCD]" >
                  <div className="flex h-full flex-col justify-center space-y-6 sm:space-y-10 md:space-y-14">
                    <img src={walkingImg} alt="walking" className='flip-img' />
                    {
                      features.map((feature, i)=> {
                        return (
                          <div key={i} className="text-center flex flex-col gap-1 sm:gap-2 ">
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
                  <form onSubmit={handleSubmit} className="flex h-full flex-col justify-center">
                    <Logo />
                    <h3 className='mt-10 font-semibold text-center mb-4 sm:mb-8 text-[#84899C]'>Create your account</h3>
                    <div className="relative space-y-10 md:space-y-14">
                    <FormRow label='username' name='username' type='text' value={visitor.username} handleChange={handleChange}/>
                    <FormRow id='loginEmail'  label='email' name='email' type='email' value={visitor.email} handleChange={handleChange}/>
                    <FormRow id='loginPassword' label='password' name='password' type='password' value={visitor.password} handleChange={handleChange}/>
                    <div className="text-xs sm:text-sm text-[#84899C] flex gap-1">Already have an account?<span className='cursor-pointer  bg-[#BFA1EA] text-white py-[3px] px-2 text-xs font-semibold rounded-lg animate-bounce' onClick={()=>setVisitor({...visitor, isMember: !visitor.isMember}) }>Login</span></div>
                    <button disabled={formLoading} type='submit' className='flex gap-2 items-center justify-center bg-gradient-to-br from-[#BFA1EA] to-[#735FCD] disabled:cursor-wait text-sm md:text-base font-semibold text-white rounded-md shadow-lg w-full py-[6px] sm:py-2 md:py-3 tracking-wider'>Create Account {formLoading && <Loader />}</button>
                    </div>
                  </form>
                </div>
              
              </div>

              {/* back */}
              <div className="absolute inset-4 flex flex-row-reverse back">
                
                {/* back child box */}
                <div className="hidden sm:block w-[40%] rounded-tr-md rounded-br-md px-2 sm:px-6 md:px-12 text-white h-full bg-gradient-to-br from-[#BFA1EA] to-[#735FCD]" >
                  <div className="flex h-full flex-col justify-center space-y-6 sm:space-y-10 md:space-y-14">
                  <img src={walkingImg} alt="walking" />
                    {
                      features.map((feature, i)=> {
                        return (
                          <div key={i} className="text-center flex flex-col gap-1 sm:gap-2 ">
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
                  <form onSubmit={handleSubmit} className="flex h-full flex-col justify-center">
                    <Logo/>
                    <h3 className='mt-10 font-semibold text-center mb-4 sm:mb-8 text-[#84899C]'>Login to your account</h3>
                    <div className="space-y-10 md:space-y-14">
                    <FormRow label='email' name='email' type='email' value={visitor.email} handleChange={handleChange}/>
                    <FormRow label='password' name='password' type='password' value={visitor.password} handleChange={handleChange}/>
                    <div className="text-xs sm:text-sm text-[#84899C] flex  gap-1">Don't have an account yet?<span className='cursor-pointer  bg-[#BFA1EA] text-white py-[3px] px-2 text-xs font-semibold rounded-lg animate-bounce' onClick={()=>setVisitor({...visitor, isMember: !visitor.isMember}) }>Sign Up</span></div>
                    <button disabled={formLoading} type='submit' className='flex gap-2 items-center justify-center bg-gradient-to-br from-[#BFA1EA] to-[#735FCD] disabled:cursor-wait text-sm md:text-base font-semibold text-white rounded-md shadow-lg w-full py-[6px] sm:py-2 md:py-3 tracking-wider'>Login {formLoading && <Loader />}</button>
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
