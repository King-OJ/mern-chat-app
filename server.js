import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 6000;

function start(){
    try {
        app.listen(port, ()=>{
            console.log(`Server is listening on a port: ${port}`);
        })  
    } catch (error) {
        console.log(error);
    }
}

start()
