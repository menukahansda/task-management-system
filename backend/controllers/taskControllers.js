import Task from '../models/task.js';

export const createTask = async (req, res) => {
    const {title, description, status} = req.body;

    try{
        const newTask = await Task.create({
            title, description, status
        });
        res.status(201).json(newTask);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const getTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task)
            return res.status(404).json({message: "Task not found"});
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!task)
            return res.status(404).json({message: "Task not found"});
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
         if (!task)
            return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted" });
    }catch(err){
        res.status(500).json({message: err.message});
    }
}