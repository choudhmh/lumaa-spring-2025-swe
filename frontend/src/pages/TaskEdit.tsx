import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // ✅ Fix: Allow string or null

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/tasks/task/${taskId}`);
        const task = res.data;

        setTitle(task.title);
        setDescription(task.description || '');
        setCompleted(task.completed);
      } catch (err) {
        console.error('❌ Error fetching task:', err);
        setError('Failed to fetch task data.'); // ✅ Now correctly typed
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        { title, description, completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Task updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Error updating task:', err);
      setError('Failed to update task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>📝 Edit Task</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* ✅ Show errors */}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
        Completed
      </label>
      <br />

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Updating...' : 'Update Task'}
      </button>
    </div>
  );
};

export default EditTask;
