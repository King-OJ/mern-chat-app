import Chat from '../models/chat.js'
import Message from '../models/message.js'
import User from '../models/user.js'
import { StatusCodes } from "http-status-codes"

export const sendMessage = async (req, res) => {
    const { message, chatId } = req.body

    if(!message || !chatId){
        throw new BadRequestError("Invalid data passed into request!")
    }

    let messageProperties = {
        sender: req.user.userId,
        message,
        chat: chatId
    }
    console.log(message, chatId);
    let newMessage = await Message.create(messageProperties)
    newMessage = await newMessage.populate("sender", "username avatar")
    newMessage = await newMessage.populate("chat")
    newMessage = await User.populate( newMessage, {
        path: "chat.users",
        select: "username avatar email _id",
    } )

    await Chat.findByIdAndUpdate(chatId, {
        latestMessage: newMessage
    })
    res.status(StatusCodes.OK).json({ newMessage })
    // newMessage = await newMessage.populate("chat", "username avatar").execPopulate()
}

export const allMessages = async (req, res)=> {
    const { chatId } = req.params
    // console.log(chatId);
    const messages = await Message.find({ chat: chatId }).populate("sender", "username avatar email").populate("chat")
    res.status(StatusCodes.OK).json({ messages })

}