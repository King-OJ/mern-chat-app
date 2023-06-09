import { HANDLE_MSG_CHANGE, REGISTER_USER_BEGIN, SEND_MSG } from "./actions";

export default function reducer(state, action){
    switch (action.type) {
        case REGISTER_USER_BEGIN:
            return {
                ...state,
                userLoading: true
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