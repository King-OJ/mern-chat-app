import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "./reducers";

const AppContext = createContext()

const initialState = {
    user: null,
    userLoading: false,
    notifications: null,
}

export function AppProvider ({ children }){

    
    const [ state, dispatch ] = useReducer(reducer, initialState)
    
    // register user
    const registerUser = async ( credentials )=>{
        console.log(credentials);
    }

    // login user
    const loginUser = async ( credentials )=>{
        console.log(credentials);
    }


    return (
        <AppContext.Provider value={{
            ...state,
            registerUser,
            loginUser
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
  };