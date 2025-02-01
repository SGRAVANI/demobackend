import mongoose from "mongoose"
async function connectDb() {
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connceted to db")
    }
    catch(e)
    {
       console.log("error occured in db connection")
    }
}
export {connectDb}