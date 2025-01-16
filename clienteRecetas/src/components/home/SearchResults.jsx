import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./SearchResults.css";
import RecipeCard from "./RecipeCard";

function SearchResults() {
	return (
		<div>
			<Container>
				<Row>
					<Col>
						<RecipeCard></RecipeCard>
					</Col>
				</Row>
			</Container>
		</div>
  );
}

export default SearchResults;
