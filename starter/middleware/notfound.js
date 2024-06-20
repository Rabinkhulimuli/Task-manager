const notFound=(res,req)=> {
    res.status(404).send("Route doesnt exist")
}
module.exports=notFound