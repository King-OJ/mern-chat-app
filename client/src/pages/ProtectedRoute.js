import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Loader from '../components/Loader'
// import { useEffect } from 'react'

export default function ProtectedRoute({ children }) {
    const { userError, userLoading } = useAppContext()
    
    if(userLoading) return <div className="w-screen h-screen grid place-content-center"><Loader /></div>

    if(userError){
      return <Navigate to="/sign-up"/>
    }

    

  return children
}
