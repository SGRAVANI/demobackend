import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
import { connectDb } from "./utility/mongoDb_Connection.js"
import { userRouter } from "./routes/user.route.js"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()
let app=express()
app.use(cors({
    origin:['http://localhost:5173','https://demofrontend-alpha.vercel.app'],
    credentials:true
    }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.use("/",(req,res)=>{
//     //res.send("hello world")
// })
app.use((error,req,res,next)=>{
    if(error)
    {
        return res.status(500).json({msg:"internal server error"})
    }
})
app.use("/user",userRouter)
app.listen(3000,async()=>{
   // console.log(process.env.MONGODB_URI)
   console.log("server is listening on",process.env.PORT)
   await connectDb()
   //console.log("connected to db")
})
