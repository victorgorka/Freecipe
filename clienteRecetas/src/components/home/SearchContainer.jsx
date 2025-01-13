import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./SearchContainer.css";

function SearchContainer() {
  const [rangeValue, setRangeValue] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col className="search-container">
            <div className="search-filter">
              <form onSubmit={handleAddIngredient}>
                <div className="checkbox-container">
                  <input type="checkbox" id="vegan" name="vegan" value="vegan" />
                  <label htmlFor="vegan">Op. <strong>Vegana</strong></label>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" id="celiaca" name="celiaca" value="celiaca" />
                  <label htmlFor="celiaca">Op. <strong>Celiaca</strong></label>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" id="sal" name="sal" value="sal" />
                  <label htmlFor="sal">Op. <strong>Sin Sal</strong></label>
                </div>
                <Form.Label>Tiempo: {rangeValue} minutos</Form.Label>
                <Form.Range max={120} value={rangeValue} onChange={handleRangeChange} />
                <input
                  type="text"
                  placeholder="Ingresar ingredientes"
                  value={ingredient}
                  onChange={handleInputChange}
                  className="custom-placeholder"
                />
              </form>
              <div className="submitted-ingredients">
                {ingredients.map((ing, index) => (
                  <div key={index} className="ingredient-item">
                    {ing}
                    <button onClick={() => handleRemoveIngredient(index)}>x</button>
                  </div>
                ))}
              </div>
              <br />
              <button type="submit">Recomendar</button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SearchContainer;