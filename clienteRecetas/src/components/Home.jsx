import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import SearchContainer from "./home/SearchContainer";
import SearchResults from "./home/SearchResults";
import LandingPage from "./home/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";

function Home() {
  const [searchResults, setSearchResults] = useState([]);

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
    <Router>
      <Routes>
        {/* Route for the LandingPage at the root path */}
        <Route path="/" element={<LandingPage />} />

        {/* Routes for the Login and Register*/}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Route for testing user data*/}

        <Route path="/user" element={<UserProfile />} />

        {/* Route for the main app layout with search components */}
        <Route
          path="/search"
          element={
            <Container>
              <Row>
                <Col>
                  <SearchContainer onSearch={handleSearch} />
                </Col>
                <Col>
                  <SearchResults results={searchResults} />
                </Col>
              </Row>
            </Container>
          }
        />
      </Routes>
    </Router>
  );
}

export default Home;
