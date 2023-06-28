import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/badRequest.js"
import Chat from "../models/chat.js"
import User from "../models/user.js"

export const accessChat = async (req, res)=>{
    // console.log(req.params);
    const { id: userId  } = req.body
    
    if( !userId ){
        throw new BadRequestError('User ID not sent with request')
    }

    let chatExist = await Chat.find(
        {
            isGroupChat: false,
            $and: [
                {
                   users: { $elemMatch: { $eq: req.user.userId  } }
                },
                {
                   users: { $elemMatch: { $eq: userId  } }
                },
            ],
        }
    )
    .populate("users", "-password").populate("latestMessage")

    chatExist = await User.populate( chatExist, {
        path: "latestMessage.sender",
        select: "name email avatar"
    }) 

    // console.log(chatExist);


    if(chatExist && chatExist.length > 0){
        res.status(StatusCodes.ACCEPTED).json({ chat: chatExist[0] })
    }
    else {
        let chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [
                req.user.userId,
                userId
            ]
        }

        const createdChat = await Chat.create(chatData)
        // console.log(createdChat);

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")
        // console.log(fullChat);
        res.status(StatusCodes.CREATED).json({ chat: fullChat})
    }
}

export const fetchChats = async (req, res)=>{
    let chats = await Chat.find({ users : { $elemMatch: { $eq: req.user.userId } }})
    .populate("users", "-password")
    .populate("groupAdmin", "-password" )
    .populate("latestMessage")
    .sort({ updateAt: -1 })
    
    chats = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "name email avatar bio"
    })
    // console.log(chats);
    
    res.status(StatusCodes.ACCEPTED).json({ chats })
}

export const createGroupChat = async ( req, res)=> {
    let { groupUsers, groupName } = req.body
   
    if(!groupUsers || !groupName){
        throw new BadRequestError("Please fill all the fields!")
    }

    if(groupUsers.length < 2){
        throw new BadRequestError("More than 2 users are required to form a group chat!")
    }

    groupUsers = [...groupUsers, req.user.userId ] 
    console.log(groupUsers);

    const groupChat = await Chat.create({
        chatName: groupName,
        isGroupChat: true,
        groupAdmin: req.user.userId,
        users: groupUsers
    })

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

    res.status(StatusCodes.CREATED).json({ chats: fullGroupChat })

}

export const updateGroup = async ( req, res )=> {
    const { chatId, chatName } = req.body

    if(!chatId || !chatName){
        throw new BadRequestError("Chat ID or Chat name missing")
    }

    const updateChat = await Chat.findByIdAndUpdate(
        chatId, 
        {
           chatName 
        },
        {
            new: true
        }
    )

    res.status(StatusCodes.OK).json({ chats: updateChat })

}

export const addToGroup = async ( req, res )=> {
    const { chatId, userId } = req.body

    if(!chatId || !userId){
        throw new BadRequestError("Chat ID or User Id is missing")
    }

    const updatedChatAfterUserAdded = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId}   
        },
        {
            new: true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");

    res.status(StatusCodes.OK).json({ chats: updatedChatAfterUserAdded })
}

export const removeFromGroup = async ( req, res )=> {
    const { chatId, userId } = req.body

    if(!chatId || !userId){
        throw new BadRequestError("Chat ID or User Id is missing")
    }

    const updatedChatAfterUserRemoved = await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId}   
        },
        {
            new: true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");

    res.status(StatusCodes.OK).json({ chats: updatedChatAfterUserRemoved })
}