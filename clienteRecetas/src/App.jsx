import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import LandingPage from './components/home/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/search" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<UserProfile />} />
    </Routes>
  </Router>
  )
}

export default App
