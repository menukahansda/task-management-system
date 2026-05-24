import Task from '../models/task.js';

export const createTask = async (req, res) => {
    const {title, description, status} = req.body;

    try{
        const newTask = await Task.create({
            title, description, status, user: req.user.id
        });
        res.status(201).json({
            success: true,
            message: "Task created",
            data: newTask
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({
            success: true,
            message: "Tasks retrieved",
            data: tasks
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const getTask = async (req, res) => {
    try{
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if(!task)
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        res.status(200).json({
            success: true,
            message: "Task retrieved",
            data: task
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const updateTask = async (req, res) => {
    try{
        const task = await Task.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
            }, req.body, {
            returnDocument: "after"
        }); 
        if(!task)
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        res.status(200).json({
            success: true,
            message: "Task updated",
            data: task
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const deleteTask = async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
         if (!task)
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        res.status(200).json({
            success: true,
            message: "Task deleted"
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}