import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import SearchContainer from "./home/SearchContainer";
import SearchResults from "./home/SearchResults";
import LandingPage from "./home/LandingPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation(); 
  const { userData } = location.state || {}; // Extract userData from location state

  const handleSearch = async (url) => { 
    try {
      const response = await fetch(url); 
      const data = await response.json();
      setSearchResults(data);
      console.log(url);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container> 
      <Row>
        <Col>
          <SearchContainer onSearch={handleSearch} /> 
        </Col>
        <Col>
          <SearchResults results={searchResults} /> 
        </Col>
      </Row>
      {/* Conditionally render user name if available */}
      {userData && (
        <div className="user-info">
          <p>Welcome, {userData.fullName}</p> 
        </div>
      )}
    </Container>
  );
}

export default Home;