const express =require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRoutes");
const cors=require("cors");
const { empRouter } = require("./Routes/empRoutes");
const app=express()
app.use(cors())


app.use(express.json())
app.use("/users",userRouter)
app.use("/emp",empRouter)



app.listen(8000,async()=>{
try {
    await connection
    console.log("connected to the db");
    console.log("server running on port 8000");

} catch (error) {
   console.log(error);
}

})

