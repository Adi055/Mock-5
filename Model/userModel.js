const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
email:String,
password:String,
cpassword:String
})


const UserModel =mongoose.model("user",userSchema)

module.exports={
    UserModel
}