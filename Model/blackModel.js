const mongoose=require("mongoose")

const blackSchema=mongoose.Schema({
token:String
})


const BlackModel =mongoose.model("token",blackSchema)

module.exports={
    BlackModel
}