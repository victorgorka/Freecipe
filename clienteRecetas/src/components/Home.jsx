import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import SearchContainer from "./home/SearchContainer";
import SearchResults from "./home/SearchResults";
import LandingPage from "./home/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <Router>
      <Routes>
        {/* Route for the LandingPage at the root path */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for the main app layout with search components */}
        <Route
          path="/search"
          element={
            <Container>
              <Row>
                <Col>
                  <SearchContainer />
                </Col>
                <Col>
                  <SearchResults />
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
