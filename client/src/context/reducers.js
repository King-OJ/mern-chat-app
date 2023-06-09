import { GET_ALL_CHATS_BEGIN, GET_ALL_CHATS_ERROR, GET_ALL_CHATS_SUCCESS, GET_ALL_USERS_BEGIN, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_ERROR, GET_CURRENT_USER_SUCCESS, GET_MSG_BEGIN, GET_MSG_ERROR, GET_MSG_SUCCESS, HANDLE_MSG_CHANGE, HANDLE_SEARCH_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER, OPEN_CHAT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, SELECT_CHATMATE, SEND_MSG_BEGIN, SEND_MSG_SUCCESS} from "./actions";
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

        case HANDLE_SEARCH_CHANGE:
            return {
                ...state,
                search: action.payload
            }

        case SEND_MSG_BEGIN:
            
            return {
                ...state,
                newMsg: ''
            }
        case SEND_MSG_SUCCESS:
            
            return {
                ...state,
                messages: [...state.messages, action.payload],
                newMsg: ''
            }

        case GET_MSG_BEGIN:        
            return {
                ...state,
                messagesLoading: true,
            }
        case GET_MSG_SUCCESS:
            
            
            return {
                ...state,
                messages: action.payload,
                messagesLoading: false,
            }
        case GET_MSG_ERROR:      
            return {
                ...state,
                messagesLoading: false,
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
        
        
        case GET_ALL_USERS_BEGIN:
            
            return {
                ...state,
                searchUsersLoading: true,
            }
        
        
        case GET_ALL_USERS_SUCCESS:
            
            return {
                    ...state,
                    searchSuggestions: action.payload,
                    allUsers: action.payload,
                    searchUsersLoading: false,
                }

        case GET_ALL_USERS_ERROR:
            
            return {
                    ...state,
                    searchUsersLoading: false,
                }
        
        
        case GET_ALL_CHATS_BEGIN:
            
            return {
                ...state,
                allChatsLoading: true,
            }
        
        
        case GET_ALL_CHATS_SUCCESS:
            const { chats } = action.payload
            const latestMessages = []
            chats.forEach((chat)=>{
                if(chat.latestMessage) latestMessages.push(chat.latestMessage)
            })
            return {
                    ...state,
                    activeChats: chats,
                    latestMessages,
                    allChatsLoading: false,
                }

        case GET_ALL_CHATS_ERROR:
            
            return {
                    ...state,
                    allUsersLoading: false,
                }
        
        case SELECT_CHATMATE: 
        const selectedChat = state.searchSuggestions.find((chat)=> chat._id === action.payload.id )
        const searchSuggestions = state.searchSuggestions.filter((chat)=> chat._id !== action.payload.id)
        const chatAlreadyExist = state.activeChats.find((chat)=> chat._id === action.payload.chat._id)
        if (chatAlreadyExist){
            return {
                ...state ,selectedChatMateID: chatAlreadyExist.users.find((user)=> user._id !== state.user._id)._id , selectedChatID: chatAlreadyExist._id, openedChatMate: chatAlreadyExist.users.find((user)=> user._id !== state.user._id), search: "", searchSuggestions
            } 
        }
        return {
            ...state, activeChats: [action.payload.chat, ...state.activeChats ], selectedChatMateID: selectedChat._id , selectedChatID: action.payload.chat._id , openedChatMate: selectedChat, search: "", searchSuggestions
        }

        case LOGOUT_USER:
            
            return {...initialState, userError: true, userLoading: false}

        case OPEN_CHAT:
            if(action.payload.isGroupChat){
                const groupMembers = state.activeChats.find((chat)=> chat._id === action.payload.chatId).users
                const groupName = state.activeChats.find((chat)=> chat._id === action.payload.chatId).chatName
                const groupAdmin = state.activeChats.find((chat)=> chat._id === action.payload.chatId).groupAdmin
                return {...state, groupName , groupAdmin, isGroupChat: true, openedChatMate: null, selectedChatID: action.payload.chatId, groupMembers}  
            }
            const openedChatMate = state.activeChats.find((chat)=> chat._id === action.payload.chatId).users.find((ele)=> ele._id === action.payload.chatMateId )

            return {...state, groupName: "", groupAdmin: null, isGroupChat: false, groupMembers: [], openedChatMate, selectedChatID: action.payload.chatId, selectedChatMateID: action.payload.chatMateId}
        

        default:
            break;
    }

    throw new Error(`no such action :${action.type}`)
}