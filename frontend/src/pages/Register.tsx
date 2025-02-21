import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert('❌ Please enter an email and password.');
      return;
    }

    setLoading(true);

    try {
      console.log('🔹 Registering user:', { email, password });

      const res = await axios.post('http://localhost:3000/auth/register', { name,email, password });

      console.log('✅ Registration successful:', res.data);

      alert('✅ Registration successful! Please log in.');

      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration Error:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Registration failed.');
      } else {
        console.error('Unexpected Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '300px', margin: 'auto' }}>
   
      <h2>Register</h2>
      <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>


      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
