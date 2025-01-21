import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      const { token } = response.data; 
      localStorage.setItem('token', token);

      // Fetch user data after successful login (optional)
      const userResponse = await axios.get('http://localhost:8080/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const userData = userResponse.data; // Access user data

      navigate('/search', { state: { userData } }); // Redirect with user data
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;