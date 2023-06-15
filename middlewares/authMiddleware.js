import UnauthenticatedError from "../errors/Unauthenticated.js"
import jwt from 'jsonwebtoken';

export default function authenticateUser( req, res, next) {
    
    const token = req.cookies.token

    if(!token){
        throw new UnauthenticatedError('Authentication Invalid')
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId : payload.userID }  
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    

    next()
}
