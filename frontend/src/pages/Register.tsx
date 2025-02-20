import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Ensure no user is logged in when opening the Register page
  useEffect(() => {
    localStorage.removeItem('token'); // 🛠 Remove any stored token
    localStorage.removeItem('userId'); // 🛠 Remove stored userId
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('❌ Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      console.log('🔹 Registering user:', { name, email, password });

      const res = await axios.post('http://localhost:3000/auth/register', {
        name,  // ✅ Name added in request
        email,
        password,
      });

      console.log('✅ Registration successful:', res.data);

      // ✅ Redirect to login instead of dashboard
      navigate('/login'); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Registration Error:', error.response?.data || error.message);
        alert(error.response?.data?.message || '❌ Registration failed.');
      } else {
        console.error('❌ Unexpected Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', textAlign: 'center' }}>
      <h2>Register</h2>
      <input
        type="text"  // ✅ Fixed type (no `name` type in HTML)
        placeholder="Name"
        value={name}  // ✅ Fixed value
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px' }}
      />
      <button onClick={handleRegister} disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
};

export default Register;
