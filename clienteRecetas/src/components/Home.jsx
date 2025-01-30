import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import "./Home.css";
import SearchContainer from "./home/SearchContainer";
import SearchResults from "./home/SearchResults";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUser } from "react-icons/fa";
import axiosInstance from "../config/axiosConfig";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Optional, for displaying user's name
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage] = useState(4); // Number of items to display per page
  const navigate = useNavigate();

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);

      // Optionally, decode the token to extract user info (e.g., username)
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUserName(decodedToken.sub || "User"); // Adjust based on your JWT payload
      }
    }
  }, []);

  const isTokenValid = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp > now; // Check if token is not expired
    } catch (error) {
      return false; // Invalid token
    }
  };

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
      setCurrentPage(1); // Reset to the first page after a new search
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

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      {/* Navigation Bar */}
      <Row className="mb-4">
        <Col>
          <Navbar bg="none" expand="lg">
            <Navbar.Brand>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {isLoggedIn ? (
                  <>
                    <Nav.Item>
                      <Link to="/user" className="nav-link">
                        <FaUser size={20} className="me-2" /> {/* Profile icon */}
                        <span>Perfil</span>
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <button className="btn btn-link nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </Nav.Item>
                    <Nav.Item>
                      <p className="nav-link mb-0">Bienvenido, {userName}</p>
                    </Nav.Item>
                  </>
                ) : (
                  <Nav.Item>
                    <Link to="/login" className="nav-link">
                      <FaSignInAlt size={20} className="me-2" /> {/* Login icon */}
                      <span>Login</span>
                    </Link>
                  </Nav.Item>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>

      {/* Search and Results Section */}
      <Row>
        <Col>
          <SearchContainer onSearch={handleSearch} />
        </Col>
        <Col>
          <SearchResults results={currentItems} />
        </Col>
      </Row>

      {/* Pagination Controls */}
      {searchResults.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
}

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <button
        className="btn btn-outline-primary mx-1"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="mx-3 align-self-center">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="btn btn-outline-primary mx-1"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Home;