
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddTaskPage = () => {
  const { taskId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setTasktStatus] = useState('pending');
  const [priority, setTaskPriority] = useState('low');
  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ title, description,  status, priority, createdAt }),
      });

      if (res.ok) {
        toast.success('Task created successfully');
       navigate("./viewtaskPage");
      } else {
        toast.error('Failed to create task');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      const res = await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success('Task status updated successfully');
        setTasktStatus(newStatus);
      } else {
        toast.error('Failed to update Task status');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };


  const handlePriorityChange = async (e) => {
    const newStatus = e.target.value;

    try {
      const res = await fetch(`/api/tasks/${taskId}/priority`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success('Task status updated successfully');
        setTasktStatus(newStatus);
      } else {
        toast.error('Failed to update Task status');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
       
       
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Task Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Task Priority</label>
          <select
            value={priority}
            onChange={handlePriorityChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="pending">Low</option>
            <option value="in-progress">Medium</option>
            <option value="completed">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
