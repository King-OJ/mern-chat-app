import BadRequestError from "../errors/badRequest"
import Chat from "../models/chat"

export const accessChat = async (req, res)=>{
    const { userId } = req.body
    
    if( !userId ){
        throw new BadRequestError('User ID not sent with request')
    }

    const doesChatExist = await Chat.find(
        {
            isGroupChat: false,
            $and: [
                {
                    
                }
            ]
        }
    )
}