import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./SearchContainer.css";

function SearchContainer() {
	return (
		<div>
			<Container>
				<Row>
					<Col>
						<div className="search-container">
							<h1>Encuentra la receta perfecta</h1>
							<form>
								<input type="text" placeholder="Buscar receta" />
								<button type="submit">Buscar</button>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
  );
}

export default SearchContainer;