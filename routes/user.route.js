import express from "express";
import { register,login,userData} from "../controllers/user.controller.js";
import { verifyLogin } from "../utility/middlewares.js";

let userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/data",verifyLogin,userData)
export {userRouter}