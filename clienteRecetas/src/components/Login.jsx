import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Login successful, response:', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Navigate to /search on successful login
      navigate('/search');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);

      // Check if the error is due to bad credentials
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <Link to="/search">Home</Link>
      <p>Don't have an account yet? <Link to="/register">Sign Up</Link></p>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
