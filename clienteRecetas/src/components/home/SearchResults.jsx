import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./SearchResults.css";

function SearchResults() {
	return (
		<div>
			<Container>
				<Row>
					<Col>
						<div className="search-results">
							<h2>Resultados de la búsqueda</h2>
							<p>Mostrar los resultados aquí</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
  );
}

export default SearchResults;
