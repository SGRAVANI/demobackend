//import { json } from "body-parser"
import jwt from "jsonwebtoken"
async function  verifyLogin(req,res,next) {
    let token=req.headers.authorization
    if(!token)
    {
        return res.status(400).json({message:"token required"})
    }
    console.log("token is ",token)

    let data=await jwt.verify(token,process.env.SECRET)
    console.log(data)
    next() 
}
export {verifyLogin}