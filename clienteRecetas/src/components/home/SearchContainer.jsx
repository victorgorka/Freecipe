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
							<form>
								<div className="checkbox-container">
									<input type="checkbox" id="vegan" name="vegan" value="vegan" />
									<label htmlFor="vegan">Op. Vegana</label>
								</div>
								<div className="checkbox-container">
									<input type="checkbox" id="celiaca" name="celiaca" value="celiaca" />
									<label htmlFor="vegan">Op. Celiaca</label>
								</div>
								<div className="checkbox-container">
									<input type="checkbox" id="sal" name="sal" value="sal" />
									<label htmlFor="vegan">Op. Sin Sal</label>
								</div>
								<input type="text" placeholder="Buscar ingredientes" />
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