const connectDB=require("./db/connect")
const express= require("express")
const task = require("./router/task")
require("dotenv").config()
const app= express()
app.use(express.static("./public"))
app.get("/",(req,res)=> {
    res.send("This is homepage section")
})
app.use(express.json())
app.use("/api/v1/tasks",task)

const start= async()=> {
    try {
        await connectDB(process.env.mongoo_uri)
        console.log("*** CONNECTED TO DB ***")
        app.listen(5000,()=> {
            console.log("server started at loalhost:5000")
        })
    } catch (error){
        console.log(error)
    }
}
start()