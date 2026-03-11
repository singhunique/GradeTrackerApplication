import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    assignedTo: '', // In a real app, this would be a User ID from a dropdown
    hoursLogged: 0
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/tasks', formData);
    setFormData({ title: '', assignedTo: '', hoursLogged: 0 });
    onTaskAdded(); // Refresh the stats
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
      <h3>Log New Task/Contribution</h3>
      <input type="text" placeholder="Task Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /><br/>
      <input type="text" placeholder="Student ID/Name" value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})} required /><br/>
      <input type="number" placeholder="Hours Spent" value={formData.hoursLogged} onChange={e => setFormData({...formData, hoursLogged: e.target.value})} required /><br/>
      <button type="submit">Add Contribution</button>
    </form>
  );
};

export default TaskForm;