import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "./reducers";
import { HANDLE_MSG_CHANGE, REGISTER_USER_BEGIN, SEND_MSG } from "./actions";

const AppContext = createContext()

const initialState = {
    user: null,
    userLoading: false,
    notifications: null,
    newMsg: '',
    messages: [
        {
            myText: true,
            text: 'Hello Clem'
        },
        {
            myText: false,
            text: 'How are you?'
        },
        {
            myText: true,
            text: 'I dey alright oh'
        },
        {
            myText: false,
            text: 'You just forget ur guy'
        },
        {
            myText: true,
            text: 'Obob wahala too much oh i no forget u'
        },
        {
            myText: false,
            text: 'I swear everybody dey collect this period'
        },
        {
            myText: true,
            text: 'I tell u oh, haha'
        },
        {
            myText: false,
            text: 'How your family na watin dey happen?'
        },
        {
            myText: true,
            text: 'Family is well boss, just one issue to the other, you know as e dey go na'
        },
        {
            myText: false,
            text: 'Omor U nor need to tell me oh'
        },
        {
            myText: true,
            text: 'To be a man is not a day job na'
        },
        {
            myText: false,
            text: 'U dey feel me ba'
        },
        {
            myText: true,
            text: 'I dey feel u die ma guy, who nor go nor know na'
        },
        {
            myText: false,
            text: 'That is, u dey get am clear my G'
        },
        {
            myText: true,
            text: 'Abeg where u dey go today make I follow u'
        },
        {
            myText: false,
            text: 'Oboy na Area 1 for apo oh'
        },
        {
            myText: true,
            text: 'but 2 guys done buzz me to follow that route still on the slabbing'
        },
        {
            myText: false,
            text: 'but 2 guys done buzz me to follow that route still on the slabbing'
        },
        {
            myText: false,
            text: 'haha, legezy tins oh'
        },
    ]
}

export function AppProvider ({ children }){

    
    const [ state, dispatch ] = useReducer(reducer, initialState)
    
    // register user
    const registerUser = async ( credentials )=>{
        dispatch({ type: REGISTER_USER_BEGIN })
        console.log(credentials);
    }

    // login user
    const loginUser = async ( credentials )=>{
        console.log(credentials);
    }

    //handle message change
    const handleMsgChng = (text)=>{
        dispatch({type: HANDLE_MSG_CHANGE, payload:text})
    }

    //send msg
    const sendMsg = ()=>{
        dispatch({ type:SEND_MSG })
    }


    return (
        <AppContext.Provider value={{
            ...state,
            registerUser,
            loginUser,
            handleMsgChng,
            sendMsg
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
  };