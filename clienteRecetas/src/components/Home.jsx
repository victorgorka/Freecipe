import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import SearchContainer from "./home/SearchContainer";
import SearchResults from "./home/SearchResults";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Optional, for displaying user's name
  const navigate = useNavigate();

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // Optionally, decode the token to extract user info (e.g., username)
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUserName(decodedToken.sub || "User"); // Adjust based on your JWT payload
      }
    }
  }, []);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };

  const handleSearch = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsLoggedIn(false); // Update logged-in state
    setUserName(""); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <Container>
      <button>
        <Link to="/">HOME</Link>
      </button>
      {isLoggedIn ? (
        <>
          <button>
            <Link to="/user">PROFILE</Link>
          </button>
          <button onClick={handleLogout}>Logout</button>
          <p>Welcome, {userName}</p>
        </>
      ) : (
        <button>
          <Link to="/login">LOGIN</Link>
        </button>
      )}
      <Row>
        <Col>
          <SearchContainer onSearch={handleSearch} />
        </Col>
        <Col>
          <SearchResults results={searchResults} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
