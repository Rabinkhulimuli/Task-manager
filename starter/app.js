const connectDB=require("./db/connect")
const express= require("express")
const task = require("./router/task")
const notFound= require("./middleware/notfound")
const ErrorHandler=require("./middleware/error-handler")
require("dotenv").config()
const app= express()
const port= process.env.PORT || 5000
app.use(express.static("./public"))
app.get("/",(req,res)=> {
    res.send("This is homepage section")
})
app.use(express.json())
app.use("/api/v1/tasks",task)
app.use(notFound)
app.use(ErrorHandler)

const start= async()=> {
    try {
        await connectDB(process.env.mongoo_uri)
        console.log("*** CONNECTED TO DB ***")
        app.listen(port,()=> {
            console.log(`server started at loalhost:${port}`)
        })
    } catch (error){
        console.log(error)
    }
}
start()