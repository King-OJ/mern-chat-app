import { GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_ERROR, GET_CURRENT_USER_SUCCESS, HANDLE_MSG_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SEND_MSG} from "./actions";
import { initialState } from "./appContext";

export default function reducer(state, action){
    switch (action.type) {

        case REGISTER_USER_BEGIN:
            return {
                ...state,
                formLoading: true
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                formLoading: false,
                userError: false
            }

        case REGISTER_USER_ERROR:
            return {
                ...state,
                user: null,
                formLoading: false
            }

        case LOGIN_USER_BEGIN:
            return {
                ...state,
                user: null,
                formLoading: true,
            }

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                formLoading: false,
                userLoading: false,
                userError: false
            }

        case LOGIN_USER_ERROR:
            return {
                ...state,
                user: null,
                formLoading: false,
                userLoading: false
            }

        case HANDLE_MSG_CHANGE:
            return {
                ...state,
                newMsg: action.payload
            }

        case SEND_MSG:
            const msg = { text: state.newMsg, myText: true}
            
            
            return {
                ...state,
                messages: [...state.messages, msg],
                newMsg: ''
            }
        
        
        case GET_CURRENT_USER_BEGIN:
            
            return {
                ...state,
                userLoading: true,
                userError: false
            }
        
        
        case GET_CURRENT_USER_SUCCESS:
            
            return {
                    ...state,
                    user: action.payload,
                    userLoading: false,
                    userError: false
                }

        case GET_CURRENT_USER_ERROR:
            
            return {
                    ...state,
                    userLoading: false,
                    userError: true,
                }

        case LOGOUT_USER:
            
            return {...initialState, userError: true, userLoading: false}
        

        default:
            break;
    }

    throw new Error(`no such action :${action.type}`)
}