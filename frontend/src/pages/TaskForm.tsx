import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({ title: '', description: '', userId: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        setTaskData((prev) => ({ ...prev, userId: decodedToken.sub })); // ✅ Extract userId from token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axios.post(
        'http://localhost:3000/tasks',
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('✅ Task Created Successfully!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>Create/Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={taskData.title} onChange={handleChange} placeholder="Task Title" required />
        <input name="description" value={taskData.description} onChange={handleChange} placeholder="Task Description" required />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
          <button type="submit">Create Task</button>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ background: 'none', color: 'blue', border: 'none', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
