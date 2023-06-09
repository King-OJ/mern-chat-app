import { createContext, useContext, useReducer} from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import reducer from "./reducers";
import { CLEAR_ALERT, HANDLE_MSG_CHANGE, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SEND_MSG, SHOW_ALERT } from "./actions";

const AppContext = createContext()

const initialState = {
    showAlert: false,
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
            const response = await axios.post('/api/v1/auth/sign-up', credentials)
            const { data : { user } } = response
            showAlert( 'success', 'Account created successfully! Redirecting!')
            setTimeout(()=>{
                dispatch( { type: REGISTER_USER_SUCCESS, payload: user })
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