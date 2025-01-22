const express = require("express");
const mongoose = require("mongoose");
const Task= require("../models/Task");
const router = express.Router();

router.post('/tasks', async (req, res) => {
    try {
      const { title, description, status, priority, createdAt } = req.body;
  

      const newTask = new Task({
        title,
        description,
        status, 
        priority,
        createdAt,
      });

      await newTask.save();

      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/tasks', async (req, res) => {
  
    try {
  
      const { title } = req.params;
      const tasks = await Task.find({_title:title});
    
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found' });
      }
         
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.put("/tasks/:taskId", async (req, res) => {

  
    const { taskId } = req.params;
    const { status } = req.body;
    try {
      const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task status" });
    }
  });
  
  router.delete("/tasks/:taskId", async (req, res) => {
  
    const { taskId } = req.params;
    try {
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) return res.status(404).json({ error: "task not found" });
      res.json({ message: "task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });
  
  

  module.exports = router;