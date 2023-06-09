import express from 'express';
import morgan from 'morgan';
import "express-async-errors";

import notFoundMiddleware from './middlewares/notFound.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';

import authRouter from './routes/auth.js'
import connectDB from './db/connectDB.js';



import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

//use morgan to show htp routes only in development
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }

//to parse json requests
app.use(express.json())

//auth routes
app.use('/api/v1/auth', authRouter)

//error for undefined routes
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.get('/', (req, res)=> res.send('Hello from server'))

async function start(){
    try {
        await connectDB(process.env.MongoDB_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening on a port: ${port}`);
        })  
    } catch (error) {
        console.log(`An error occured: ${error}`);
    }
}

start()
