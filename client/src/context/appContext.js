import { createContext, useContext, useEffect, useReducer} from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import reducer from "./reducers";
import {  GET_ALL_USERS_BEGIN, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS, GET_CURRENT_USER_ERROR, HANDLE_MSG_CHANGE, HANDLE_SEARCH_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, OPEN_CHAT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SELECT_CHATMATE, SEND_MSG } from "./actions";
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
    allUsersLoading: false,
    formLoading: false,
    openedChatUser: null,
    activeChatMate: null,
    notifications: null,
    newMsg: '',
    selectedChatMateID: '',
    selectedChatID: '',
    activeChats: [],
    allUsers: [],
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

    //get all users
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


    //handle message change
    const handleMsgChng = (text)=>{
        dispatch({type: HANDLE_MSG_CHANGE, payload:text})
    }

    //handle search change
    const handleSearchChng = (text)=>{
        dispatch({type: HANDLE_SEARCH_CHANGE, payload:text})
    }

    //send msg
    const sendMsg = ()=>{
        dispatch({ type:SEND_MSG })
    }

    //select a chatmate
    const selectChatMate = (id)=>{
        dispatch({ type: SELECT_CHATMATE, payload: id })
    }

    //to open a chat
    const openChat = (chatId)=>{
        dispatch({type: OPEN_CHAT, payload: chatId})
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