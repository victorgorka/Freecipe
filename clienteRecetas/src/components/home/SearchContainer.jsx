import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./SearchContainer.css";

function SearchContainer() {
	const [rangeValue, setRangeValue] = useState(0);

	const handleRangeChange = (event) => {
		setRangeValue(event.target.value);
	}

	return (
		<div>
			<Container>
				<Row>
					<Col className="search-container">
						<div className="search-filter">
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
								<Form.Label>Tiempo: {rangeValue} minutos</Form.Label>
      							<Form.Range max={120} value={rangeValue} onChange={handleRangeChange} />
								<input type="text" placeholder="Ingredientes" />
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