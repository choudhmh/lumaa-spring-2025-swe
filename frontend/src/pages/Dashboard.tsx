import { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { useNavigate } from 'react-router-dom';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Get user ID from localStorage (assuming it's stored after login)
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login'); // Redirect to login if no user is found
      return;
    }

    fetchTasks(userId)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, [userId, navigate]);

  const handleAddTask = async () => {
    if (!userId) return;
    
    try {
      await createTask(userId, title, description);
      setTitle('');
      setDescription('');
      const res = await fetchTasks(userId);
      setTasks(res.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container">
      <h2>Task Dashboard</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? '✅ Done' : '❌ Pending'}
            <button onClick={() => updateTask(task.id, !task.completed)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
