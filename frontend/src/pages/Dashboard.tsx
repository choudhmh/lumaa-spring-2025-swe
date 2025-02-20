import { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // ✅ Define type for tasks
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('❌ No user ID found. Please log in.');
      return;
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        console.log(`🔹 Fetching tasks for user: ${userId}`);
        const res = await axios.get(`http://localhost:3000/tasks/${userId}`);
        setTasks(res.data); // ✅ Now TypeScript knows tasks has an 'id' field
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('❌ Error fetching tasks:', error.response?.data || error.message);
        } else {
          console.error('❌ Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {task.completed ? '✅ Completed' : '❌ Not completed'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
