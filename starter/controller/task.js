const Task= require("../models/task")
const asyncWrapper= require("../middleware/async")
const {crerateCustomError}=require("../middleware/custom-error")
const getAllTask= asyncWrapper(async (req,res)=> {
        const tasks= await Task.find({})
        res.status(201).json({tasks})
    
})
const createTask = asyncWrapper(async  (req,res)=> {
    const tasks= await Task.create(req.body)
    return res.status(201).json({tasks})
})
const getTask = asyncWrapper(async (req,res,next)=> {
    const {id:taskID}=req.params
    const tasks = await Task.findOne({_id:taskID})
    if(!tasks){
        
        return next(createCustomError(`No such task found with id :${taskID}`,404))
    }
    res.status(200).json({tasks})
  
})
const updateTask =asyncWrapper(async (req,res)=> {
        const{id:taskID}= req.params
        const tasks=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        })
        if(!tasks){
            return next(createCustomError(`No such tasks found with _id:${taskID}`,404))
           
        }
        res.status(200).json({tasks})
   
    
})
const deleteTask=asyncWrapper(async (req,res)=> {
        const{id:taskID}=req.params
        const tasks= await Task.findOneAndDelete({_id:taskID})
        if(!tasks){
            return next(createCustomError(`No such tasks with id:${taskID}`, 404))
           
        }
        res.status(200).json({tasks})
})
module.exports={
    getAllTask,
    createTask,
    updateTask,
    getTask,
    deleteTask
}