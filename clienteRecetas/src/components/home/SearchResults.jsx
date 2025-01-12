import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./SearchResults.css";
import CardComponent from "./Cards";

function SearchResults() {
	return (
		<div>
			<Container>
				<Row>
					<Col>
						<CardComponent></CardComponent>
					</Col>
				</Row>
			</Container>
		</div>
  );
}

export default SearchResults;
