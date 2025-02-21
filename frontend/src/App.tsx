import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditTask from './pages/TaskEdit';
import TaskForm from './pages/TaskForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* ✅ Redirect to Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/taskform" element={<TaskForm />} /> {/* ✅ Add this route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:taskId" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;
