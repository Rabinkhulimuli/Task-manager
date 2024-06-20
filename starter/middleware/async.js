const asyncWrapper= (function1)=> {
    return async(req,res,next)=> {
        try {
            await function1(req,res,next)
        } catch(error){
            next(error)
        }
    }
}
module.exports=asyncWrapper