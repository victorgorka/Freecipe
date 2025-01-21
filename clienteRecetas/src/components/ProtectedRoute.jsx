import React from "react";
import { Navigate } from "react-router-dom";

const isTokenValid = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > now; // Check if token is not expired
  } catch (error) {
    return false; // Invalid token
  }
};


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    // Redirect to login if no token or token is invalid
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
