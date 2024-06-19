const Task= require("../models/task")
const getAllTask= async (req,res)=> {
    try {
        const tasks= await Task.find({})
        res.status(201).json({tasks})
    }catch (error){
        res.status(500).json({msg: "Error retriving all tasks"})
    }
}
const createTask = async  (req,res)=> {
   try {
    const tasks= await Task.create(req.body)
    return res.status(201).json({tasks})
   } catch (error){
    return res.status(500).json({msg:"Error"})
   }
}
const getTask =async (req,res)=> {
   try{
    const {id:taskID}=req.params
    const tasks = await Task.findOne({_id:taskID})
    if(!tasks){
        return res.status(404).json({msg:`No tasks is found with id:${taskID}`})
    }
    res.status(200).json({tasks})
   }
   catch(error){
    res.status(404).json({msg:error})
   }
}
const updateTask =async (req,res)=> {
    try{
        const{id:taskID}= req.params
        const tasks=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        })
        if(!tasks){
            return res.status(404).json({msg:`No such tasks found with _id:${taskID}`})
        }
        res.status(200).json({tasks})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}
const deleteTask=async (req,res)=> {
    try{
        const{id:taskID}=req.params
        const tasks= await Task.findOneAndDelete({_id:taskID})
        if(!tasks){
            return res.status(404).json({msg:`No such tasks with id:${taskID}`})
        }
        res.status(200).json({tasks})
    } catch(error){
        res.status(500).json({msg : error})
    }
}
module.exports={
    getAllTask,
    createTask,
    updateTask,
    getTask,
    deleteTask
}