const express=require("express");
const { UserModel } = require("../Model/userModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter=express.Router();

userRouter.post("/signup",async(req,res)=>{
    const {email,password,cpassword}=req.body;

try {
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.send({"err":err})
        }
        else{
            const user= new UserModel({email,password:hash,cpassword});
            await user.save();
            res.json({msg:"user has been registered"})
        }
    })


} catch (error) {
    res.send({"err":error})
}

})


userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body


try {
    const user= await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,user:user.email},"back")
                    res.send({"msg":"user logged in","token":token})
                }
                else{
                    res.send({"err":err})
                }
        })
    }
    else{
        res.send({"msg":"user is does not exist"})
    }

} catch (error) {
    res.send({"err":error})
}


})


module.exports={
    userRouter
}

