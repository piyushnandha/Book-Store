import  express  from "express";
import {PORT,mongDbURL} from './config.js';
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoute.js";
import cors from 'cors';

const app=express();

app.use(express.json());

app.get('/',(req,res)=>{
    return res.status(200).send("hello");
})


//option 1 allow all origin with default of cors
app.use(cors());

//option 2 allow custom origin
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );

app.use('/books',booksRoute);
mongoose.connect(mongDbURL)
.then(()=>{
    console.log('app connected to db');
    app.listen(PORT,()=>{
        console.log(`working at port no :${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
});