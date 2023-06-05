import { REGISTER_USER_BEGIN } from "./actions";

export default function reducer(state, action){
    switch (action.type) {
        case REGISTER_USER_BEGIN:
            return {
                ...state,
                userLoading: true
            }
    
        default:
            break;
    }

    throw new Error(`no such action :${action.type}`)
}