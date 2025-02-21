import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import'./Dashbaord.css';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && location.pathname !== "/login") {
      alert('No user ID found. Please log in.');
      navigate('/login');
    }
  
    const fetchTasks = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/tasks/${userId}`);
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTasks();
  }, [userId, location, navigate]);
  

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      alert('✅ Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Task Dashboard</h2>
        <Link to="#" onClick={handleLogout} className="logout-link" style={{ color: 'red', textDecoration: 'none' }}>🚪 Logout</Link>
      </div>
      <div className="task-form">
        <Link to="/taskform" className="create-btn">➕ Create Task</Link>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Start by creating a new task!</p>
      ) : (
        <div className="table-wrapper" style={{ overflowX: 'auto' }}>
          <div className="table-container" style={{ width: '100%' }}>
            <table className="task-table" style={{ width: '100%' }}>
              <thead>
                <tr>
<<<<<<< HEAD
                  <th>ID</th>
=======
                  <th>Task ID</th>
>>>>>>> a3971c8 (few css updates)
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description || 'No description'}</td>
                    <td className={task.completed ? 'completed' : 'pending'}>
                      {task.completed ? 'Completed' : 'Not Completed'}
                    </td>
                    <td className="action-buttons">
                      <Link to={`/edit/${task.id}`} className="edit-btn">✏️ Update</Link>
                      <Link to="#" onClick={() => handleDelete(task.id)} className="delete-link">🗑️ Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
