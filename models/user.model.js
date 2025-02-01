import mongoose from "mongoose";
import bcrypt from "bcrypt"
let userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true,
        
    },
    name:{
        type:String,
        required:true,

    }
})
userSchema.pre("save",async function (next){
    if(!this.isModified('password'))
    {
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.match=async function (pwd) {
    console.log(pwd,this.password)
    let res=await bcrypt.compare(pwd,this.password)
    return res;
}
let Users=mongoose.model('users',userSchema)
export {Users}
