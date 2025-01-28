import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./SearchResults.css";
import RecipeCard from "./RecipeCard";

function SearchResults({ results }) {
	console.log("Received results:", results);
  return (
    <div className="search-results-container">
      <Container>
        <Row>
          {results.map((result) => (
            <Col key={result.id}>
              <RecipeCard result={result} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SearchResults;
