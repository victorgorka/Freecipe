import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password,
        fullName,
      });
      setMessage(response.data); // Display success message
    } catch (error) {
      setMessage(error.response?.data || "Registration failed");
    }
  };

  return (
    <section className="vh-100 bg-image register-component widerForm"> {/* Unique class */}
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
                  <h2 className="text-uppercase text-center mb-5">Crear Cuenta</h2>

                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">Usuario</label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">Email</label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">Contraseña</label>
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={handleRegister}
                      >
                        Registrate
                      </button>
                    </div>

                    {message && typeof message === "object" ? (
                      <p className="text-center text-muted mt-5 mb-0">Registro completado, Bienvenido, {message.fullName}</p>
                    ) : (
                      <p className="text-center text-muted mt-5 mb-0">{message}</p>
                    )}

                    <p className="text-center text-muted mt-5 mb-0">Tienes ya una cuenta? <Link to="/login" className="fw-bold text-body"><u>Logeate aqui</u></Link></p>
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

export default Register;