import { StatusCodes } from "http-status-codes";

export default function errorHandlerMiddleware(err, req, res, next) {
  // console.log(err);
  const defaultError = {
    msg: err.message || 'Something went wrong! Try again later!',
    statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR
  }

  if(err.name && err.name === 'ValidationError'){
    const errText = Object.keys(err.errors).map((item) => {
        let text = `${item} must be atleast ${err.errors[item].properties.minlength} characters`
        if(item === 'email'){
            text = err.errors[item].properties.message
        }
     return [text].join(' , ')
    })
    
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = errText
}

  res.status(defaultError.statusCode).json({ msg: defaultError.msg})
}