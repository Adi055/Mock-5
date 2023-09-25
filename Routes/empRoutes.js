const express=require("express");
const { auth } = require("../Middleware/auth");
const { EmpModel } = require("../Model/empModel");
const { BlackModel } = require("../Model/blackModel");

const empRouter=express.Router();

empRouter.post("/employees",async(req,res)=>{
try {
    const emp=new EmpModel(req.body)
    await emp.save()
    res.send({"msg":"data has been added"})
} catch (error) {
    res.send({error:"error"})
}
})

empRouter.get("/",async(req,res)=>{




    try {
        // const {department,sortBy}=req.query
        // const filter=department ? {department}:{}

        // const sort={};
        // if(sortBy=="asc"){
        //     sort.salary=1
        // }
        // else if(sortBy=="desc"){
        //     sort.salary=-1
        // }
        const emp=await EmpModel.find({userID:req.body.userID})
        
        res.send(emp)
        res.send({"msg":"getting data"})
    } catch (error) {
        res.send({error:"error"})
    }
    })


    empRouter.patch("/update/:id",async(req,res)=>{
        const {id}=req.params;
        const emp=await EmpModel.findOne({_id:id})
        try {
            if(req.body.userID!==emp.userID){
                res.send({"msg":"you are not authorized"})
            }
            else{
                await EmpModel.findByIdAndUpdate({_id:id},req.body);
                res.send({"msg":"id has been updated"})

            }
        } catch (error) {
            res.send({"error":error})
        }
    })

empRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    const emp=await EmpModel.findOne({_id:id})
    try {
        if(req.body.userID!==emp.userID){
            res.send({"msg":"you are not authorized"})
        }
        else{
            await EmpModel.findByIdAndDelete({_id:id})
            res.send({"msg":"id has been deleted"})
        }
    } catch (error) {
        
    }
})

empRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization
    try {
        const emp=new BlackModel(token)
        await emp.save()
        res.send("user has been logged out")
    } catch (error) {
        res.send({error:"error"})
    }
    })




module.exports={
    empRouter
}