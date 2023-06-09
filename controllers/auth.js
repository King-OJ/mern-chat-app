import { StatusCodes } from 'http-status-codes';
import User from '../models/user.js'
import BadRequestError from '../errors/badRequest.js';

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
    res.status(StatusCodes.CREATED).json({ user })
}

export const loginUser = (req, res)=>{
    res.send('login route')
}

export const searchUsers = (req, res)=>{
    res.send('search user route')
}