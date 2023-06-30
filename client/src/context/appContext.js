import { createContext, useContext, useEffect, useReducer} from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import reducer from "./reducers";
import {  GET_ALL_CHATS_BEGIN, GET_ALL_CHATS_ERROR, GET_ALL_CHATS_SUCCESS, GET_ALL_USERS_BEGIN, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS, GET_CURRENT_USER_ERROR, GET_MSG_BEGIN, GET_MSG_ERROR, GET_MSG_SUCCESS, HANDLE_MSG_CHANGE, HANDLE_SEARCH_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, OPEN_CHAT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SELECT_CHATMATE, SEND_MSG_BEGIN, SEND_MSG_SUCCESS } from "./actions";
import { GET_CURRENT_USER_SUCCESS } from "./actions";
import { GET_CURRENT_USER_BEGIN } from "./actions";
import { useNavigate } from "react-router-dom";


export const initialState = {
    showAlert: false,
    userError: false,
    user: null,
    search: '',
    searchSuggestions: [],
    userLoading: false,
    searchUsersLoading: false,
    allChatsLoading: false,
    formLoading: false,
    openedChatMate: null,
    activeChatMate: null,
    notifications: null,
    newMsg: '',
    messagesLoading: false,
    isGroupChat: false,
    groupName: "",
    groupAdmin: null,
    groupMembers: [],
    selectedChatMateID: '',
    selectedChatID: '',
    activeChats: [],
    latestMessages: [],
    messages: [
        
    ]
}

const AppContext = createContext()

export function AppProvider ({ children }){

    const authFetch = axios.create({
        baseURL: '/api/v1',
        // headers: {
        //     Authorization: `Bearer ${state.token}`
        // }
    })

    const navigate = useNavigate()

    const getCurrentUser = async ()=>{
        try {
            dispatch({ type: GET_CURRENT_USER_BEGIN })
            const response = await authFetch.get('/auth/getCurrentUser')
            const { data : { user } } = response 
            dispatch( { type: GET_CURRENT_USER_SUCCESS, payload: user })
        } catch (error) {
            dispatch({ type: GET_CURRENT_USER_ERROR })
            if(error.response.status === 401){
                logout();
            }
            
        }
       
    }

    useEffect(() => {
        getCurrentUser();
        // eslint-disable-next-line 
      }, [])


    

    //show toast container for success or error
    const showAlert = (alertType, alertText)=>{
        if (alertType === "success"){
            toast.success(alertText)
        }
        else {
            toast.error(alertText)
        }
    }
    
    const [ state, dispatch ] = useReducer(reducer, initialState)
    
    // register user
    const registerUser = async ( credentials )=>{
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await authFetch.post('/auth/sign-up', credentials)
            const { data : { user } } = response
            showAlert( 'success', 'Account created successfully! Redirecting!')
            dispatch( { type: REGISTER_USER_SUCCESS, payload: user })
            setTimeout(()=>{
                navigate('/')
            }, 3000)
        } catch (error) {
            // console.log(error);
            let text = typeof error.response.data.msg === 'object' 
            ?  
            error.response.data.msg.length > 1 ? error.response.data.msg.join(' , ') : error.response.data.msg[0]
            :
            error.response.data.msg
            showAlert( 'error', text)

            dispatch( { type: REGISTER_USER_ERROR })
        }

    }

    // login user
    const loginUser = async ( credentials )=>{
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await authFetch.post('/auth/login', credentials)
            const { data : { user } } = response
            showAlert( 'success', 'Login successful! Redirecting!')
            dispatch( { type: LOGIN_USER_SUCCESS, payload: user })
            setTimeout(()=>{
                navigate('/')
            }, 3000)
        } catch (error) {
            let text = typeof error.response.data.msg === 'object' 
            ?  
            error.response.data.msg.length > 1 ? error.response.data.msg.join(' , ') : error.response.data.msg[0]
            :
            error.response.data.msg
            showAlert( 'error', text)

            dispatch( { type: LOGIN_USER_ERROR })
        }
    }

    //logout user
    const logout = async ()=>{
        try {
            const response = await authFetch.get('/auth/logout') 
            const { data : { msg } } = response
            return msg;
        } catch (error) {
            console.log(error)
            showAlert('error', 'something went wrong!')  
        } finally {
            dispatch({type: LOGOUT_USER}) 
        }
    }

    //search for chatmate
    const searchUsers = async ()=>{  
        let url= `/auth/getUsers?search=${state.search}`
        dispatch({ type: GET_ALL_USERS_BEGIN})
        try {
            const response = await authFetch.get(url) 
            const { data : { users } } = response
            dispatch({ type: GET_ALL_USERS_SUCCESS, payload: users})
        } catch (error) {
            showAlert('error', 'Something went wrong! Try again!')
            dispatch({ type: GET_ALL_USERS_ERROR}) 
        } 
    }

    //fetch all chats
    const getAllChats = async ()=>{
        dispatch({ type: GET_ALL_CHATS_BEGIN})
        try {
            const response = await authFetch.get('/chat')
            const { data : { chats } } = response
            dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: { chats }})
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_ALL_CHATS_ERROR, payload: error.response.msg })
        }
    }


    //handle message change
    const handleMsgChng = (text)=>{
        dispatch({type: HANDLE_MSG_CHANGE, payload:text})
    }

    //handle search change
    const handleSearchChng = (text)=>{
        dispatch({type: HANDLE_SEARCH_CHANGE, payload:text})
    }

    //send msg
    const getMessages = async (chatId)=>{
        dispatch({ type:GET_MSG_BEGIN })
        try {
        const response = await authFetch.get(`/message/${chatId}`)
        const { data : { messages } } = response
        dispatch({ type:GET_MSG_SUCCESS, payload: messages })
        } catch (error) {
         dispatch({ type:GET_MSG_ERROR})
         toast.error(error.response.msg)
        }
    }

    //send msg
    const sendMsg = async ()=>{
        dispatch({ type:SEND_MSG_BEGIN })
        try {
        const response = await authFetch.post('/message', { message:state.newMsg, chatId: state.selectedChatID  })
        const { data : { newMessage } } = response
        // console.log(newMessage);
        dispatch({ type:SEND_MSG_SUCCESS, payload: newMessage })
        } catch (error) {
         console.log(error);
         toast.error(error.response.msg)
        }
    }

    //select a chatmate
    const selectChatMate = async (id)=>{
        try {
            const response = await authFetch.post('/chat', { id })
            const { data : { chat } } = response
            dispatch({ type: SELECT_CHATMATE, payload: {chat, id }})

        } catch (error) {
            toast.error(error.response.msg)
        }
    }

    //to open a chat
    const openChat = (chatId, chatMateId, isGroupChat)=>{
        dispatch({type: OPEN_CHAT, payload: {chatId, chatMateId, isGroupChat}})
        getMessages(chatId)
    }


    return (
        <AppContext.Provider value={{
            ...state,
            registerUser,
            loginUser,
            handleMsgChng,
            handleSearchChng,
            sendMsg, 
            getCurrentUser,
            getAllChats,
            logout,
            openChat,
            searchUsers,
            showAlert,
            selectChatMate
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
  };