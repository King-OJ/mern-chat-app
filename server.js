import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import "express-async-errors";
import cookieParser from 'cookie-parser';

//enviroment variables
import dotenv from 'dotenv'
dotenv.config()


import { createServer } from "http"
//socket
import { Server } from "socket.io"

//middlewares
import notFoundMiddleware from './middlewares/notFound.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';

//routes
import authRouter from './routes/user.js'
import chatRouter from './routes/chat.js'
import messageRouter from './routes/message.js'

//database
import connectDB from './db/connectDB.js';



const app = express()
const port = process.env.PORT || 5000;

//use morgan to show htp routes only in development
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }

//to parse json requests
app.use(express.json())

//to allow cross browser origin policy
app.use(cors())

//to allow access to cookies sent from browsers
app.use(cookieParser())

//auth routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/message', messageRouter)

//error for undefined routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.get('/', (req, res)=> res.send('Hello from server'))


const server = createServer(app)

//socket connection
const io = new Server(server , {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  })



async function start(){
    try {
        await connectDB(process.env.MongoDB_URI)
        server.listen(port, ()=>{
            console.log(`Server is listening on a port: ${port}`);
        })  
    } catch (error) {
        console.log(`An error occured: ${error}`);
    }
}

start()

io.on('connection', (socket) => {
    console.log('a user connected');
    // console.log(socket);
    socket.on('chat message', (msg)=> {
        console.log(`a user with id: ${socket.id} sent: ${msg}`);
    })
    socket.on('disconnect', ()=> {
      console.log('A user disconnected')
    })
  })


