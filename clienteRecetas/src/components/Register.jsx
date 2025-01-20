import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="FullName"
      />
      <button onClick={handleRegister}>Register</button>
      {message && typeof message === "object" ? (
        <p>Registration successful! Welcome, {message.fullName}</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Register;
