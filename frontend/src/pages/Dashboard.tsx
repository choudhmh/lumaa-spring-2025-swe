import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description?: string;
  isComplete: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  // const navigate = useNavigate();

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
        setTasks(res.data);
      } catch (error) {
        console.error('❌ Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task.id !== taskId));
      alert('✅ Task deleted successfully!');
    } catch (error) {
      console.error('❌ Error deleting task:', error);
      alert('❌ Failed to delete task.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', textAlign: 'center' }}>
      <h2>📋 Task Dashboard</h2>
      <div>
        <Link to="/taskform">➕ Create Task</Link>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Start by creating a new task!</p>
      ) : (
        <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#ddd' }}>
              <th>ID</th>
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
                <td style={{ color: task.isComplete ? 'green' : 'red' }}>
                  {task.isComplete ? '✅ Completed' : '❌ Not Completed'}
                </td>
                <td>
                  {/* ✅ Link to Edit Page */}
                  <Link to={`/edit/${task.id}`} style={{ marginRight: '10px' }}>
  ✏️ Update
</Link>
                  <button onClick={() => handleDelete(task.id)} style={{ color: 'red' }}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
