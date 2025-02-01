import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken"
async function register(req,res,next) {
    try{
     let {username,password,name}=req.body

     console.log(username,password,name)
     let data=await Users.findOne({username:username})
     console.log(data)
     if(!data)
     {
     let newuser=await Users.create({
        username,password,name})
     console.log(newuser)
     if(newuser)
     {
        let data=await Users.find({username}).select({name:1,username:1,_id:0})
        return res.status(200).json({msg:"new user generated",succes:true,user:data})
     }
     }
     else{
        return res.status(400).json({msg:"user already exists",success:false})
     }
    }
    catch(e)
    { 
        next( new Error("error in registeration"))
    }
}
async function  login(req,res) {
   try{
    let {username,password}=req.body
    let user=await Users.findOne({username})
    console.log(user)
    if(!user)
    {
        return res.status(400).json({msg:"invalid username",success:false})
    }
     let isValid=await user.match(password)
     if(isValid)
     {
         console.log("valid user")
         let payload={username,date:new Date().toLocaleDateString()}
         let token= jwt.sign(payload,process.env.SECRET,{
            expiresIn:"10d"
         })
         console.log(token)
         if(token)
         {
            return res.status(200).json({msg:"login succeded",success:true,token:token})
         }
         else{
            return res.status(500).json({msg:"error in token generation",succes:false})
         }
         
     }
     else{
        return res.status(401).json({msg:"Invalid  credential",success:false})
     }
   }
   catch(e)
   {
    throw new Error("error in login")
   } 
}
async function userData(req,res) {
    let users=await Users.find({}).select({_id:0,name:1,username:1})
    return res.status(200).json({users:users})
}
export {register,login,userData}