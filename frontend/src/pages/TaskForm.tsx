import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({ title: '', description: '', userId: '' });
  const navigate = useNavigate(); // ✅ Hook for redirection

  // 🔹 Load userId from the stored token when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        setTaskData((prev) => ({ ...prev, userId: decodedToken.sub })); // ✅ Extract userId from token
      } catch (error) {
        console.error('❌ Error decoding token:', error);
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

      const response = await axios.post(
        'http://localhost:3000/tasks',
        taskData, // ✅ Now includes userId
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Task created:', response.data);
      alert('✅ Task Created Successfully!');

      navigate('/dashboard'); // ✅ Redirect to Dashboard after task creation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Task Submission Error:', error.response?.data || error.message);
      } else {
        console.error('❌ An unexpected error occurred:', (error as Error).message);
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>➕ Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={taskData.title} onChange={handleChange} placeholder="Task Title" required />
        <input name="description" value={taskData.description} onChange={handleChange} placeholder="Task Description" required />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
