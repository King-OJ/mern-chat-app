import { HANDLE_MSG_CHANGE, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SEND_MSG} from "./actions";

export default function reducer(state, action){
    switch (action.type) {

        case REGISTER_USER_BEGIN:
            return {
                ...state,
                userLoading: true
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                userLoading: false
            }

        case REGISTER_USER_ERROR:
            return {
                ...state,
                user: null,
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

        default:
            break;
    }

    throw new Error(`no such action :${action.type}`)
}