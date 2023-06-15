import { StatusCodes } from 'http-status-codes';
import User from '../models/user.js'
import BadRequestError from '../errors/badRequest.js';
import NotFoundError from '../errors/notFound.js';
import attachCookies from '../utils/attachCookies.js';

export const registerUser = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body

    const userAlreadyExists = await User.findOne({ email })
    if(userAlreadyExists){
        throw new BadRequestError('Account is already in use!')
    }

    const user = await User.create({
        username,
        email,
        password
    })

    //create jwt
    const token = await user.createJWT()

    //attach cookies
    attachCookies(res, token)

    res.status(StatusCodes.CREATED).json({ user, token })
}

export const loginUser = async (req, res)=>{
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if(!user){
        throw new NotFoundError('Invalid Credentials!')
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    
    if(user && !isPasswordCorrect){
        throw new BadRequestError('Incorrect login details!')
    }
    //create jwt
    const token = await user.createJWT()

    //attach cookies
    attachCookies(res, token)

    res.status(StatusCodes.OK).json({ user, token }) 
}

export const searchUsers = (req, res)=>{
    res.send('search user route')
}

export async function getCurrentUser(req, res){
    const user = await User.findOne({ _id: req.user.userId})
    res.status(StatusCodes.OK).json({ user })
}

export async function logout(req, res){
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({msg: "User successfully logged out!"})
}