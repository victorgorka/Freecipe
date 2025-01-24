import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Import the house icon
import './Login.css'; // Import the CSS file for styling

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
    <section className="vh-100 bg-image login-component widerForm"> {/* Unique class */}
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-6"> {/* Wider columns */}
              <div className="card">
                <div className="card-body p-5">
                  {/* Home Link with House Icon */}
                  <div className="text-end mb-4 home-link">
                    <Link to="/search" className="text-decoration-none">
                      <FaHome size={24} className="me-2" /> {/* House icon */}
                      <span>Home</span>
                    </Link>
                  </div>

                  <h2 className="text-uppercase text-center mb-5">Login</h2>

                  {errorMessage && <p className="text-center text-danger mb-4">{errorMessage}</p>} {/* Display error message */}

                  <form onSubmit={handleLogin}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="loginEmail">Email</label>
                      <input
                        type="email"
                        id="loginEmail"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="loginPassword">Contraseña</label>
                      <input
                        type="password"
                        id="loginPassword"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Login
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      No tienes una cuenta todavia? <Link to="/register" className="fw-bold text-body"><u>Registrate</u></Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;