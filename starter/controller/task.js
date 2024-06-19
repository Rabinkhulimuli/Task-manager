const Task= require("../models/task")
const getAllTask= async (req,res)=> {
    try {
        const task= await Task.find({})
        res.status(201).json({task})
    }catch (error){
        res.status(500).json({msg: "Error retriving all task"})
    }
}
const createTask = async  (req,res)=> {
   try {
    const task= await Task.create(req.body)
    return res.status(201).json({task})
   } catch (error){
    return res.status(500).json({msg:"Error"})
   }
}
const getTask =async (req,res)=> {
   try{
    const {id:taskId}=req.params
    const task = await Task.findOne({_id:taskId})
    if(!task){
        return res.status(404).json({msg:`No task is found with id:${taskId}`})
    }
    res.status(200).json({task})
   }
   catch(error){
    res.status(404).json({msg:error})
   }
}
const updateTask =async (req,res)=> {
    try{
        const{id:taskId}= req.params
        const task=await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true,
            runValidators:true,
        })
        if(!task){
            return res.status(404).json({msg:`No such task found with _id:${taskId}`})
        }
        res.status(200).json({task})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}
const deleteTask=async (req,res)=> {
    try{
        const{id:taskId}=req.params
        const task= await Task.findOneAndDelete({_id:taskId})
        if(!task){
            return res.status(404).json({msg:`No such task with id:${taskId}`})
        }
        res.status(200).json({task})
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