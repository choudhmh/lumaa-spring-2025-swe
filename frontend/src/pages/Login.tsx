import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('❌ Please enter both email and password.');
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('🔹 Sending:', { email, password });
  
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
  
      console.log('✅ Login successful:', res.data);
  
      // ✅ Fix: Extract userId correctly
      const { token, userId } = res.data; // Adjust based on API response
  
      if (!userId) {
        throw new Error('User ID is missing from response');
      }
  
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // ✅ Store the correct userId
  
      navigate('/taskform'); // Redirect to task form after login
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Login Error:', error.response?.data || error.message);
        alert(error.response?.data?.message || '❌ Login failed.');
      } else {
        console.error('❌ Unexpected Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
