const {customApiError}= require("./custom-error")
const ErrorHandler=(err,req,res,next)=> {
    if(err instanceof customApiError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg:"error occoured"})
}
module.exports=ErrorHandler