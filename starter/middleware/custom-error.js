
class CustomApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }
}
const createCustomError=(message,statusCode)=> {
    return new CustomApiError(msg,statusCode)
}
module.exports={CustomApiError,createCustomError}