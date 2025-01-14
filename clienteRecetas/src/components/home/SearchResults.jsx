import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./SearchResults.css";
import RecipeCard from "./RecipeCard";

function SearchResults() {
	const [numCards, setNumCards] = useState(4)

	function getNext() {
		setNumCards(numCards + 4);
	}

	return (
		<div>
			<Container>
				<Row>
					
						{[...Array(numCards).keys()].map(index => (
							<RecipeCard key={index}></RecipeCard>
						))}
					
				</Row>
				<Row>
						{numCards < 20 &&
						<button className="button2" onClick={getNext}>VER +</button>}
				</Row>
			</Container>
		</div>
  );
}

export default SearchResults;
