import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./SearchContainer.css";

function SearchContainer() {
  const [rangeValue, setRangeValue] = useState(0);
  const [ingredientId, setIngredientId] = useState("");  // Store the selected ingredient's id
  const [ingredients, setIngredients] = useState([]);  // List of added ingredients (by name)
  const [availableIngredients, setAvailableIngredients] = useState([]);  // List of available ingredients from the server

  // Fetch available ingredients from the server when the component mounts
  useEffect(() => {
    // Simulate an API call to fetch ingredients
    fetch("http://localhost:8080/ingredients")
      .then((response) => response.json())
      .then((data) => setAvailableIngredients(data))  // Update the available ingredients
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleIngredientChange = (event) => {
    setIngredientId(event.target.value);  // Set the selected ingredient id
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (ingredientId && availableIngredients.length > 0) {
      // Find the ingredient name based on the selected id
      const selectedIngredient = availableIngredients.find(ing => ing.id.toString() === ingredientId);
      if (selectedIngredient) {
        setIngredients([...ingredients, selectedIngredient.name]);
        setIngredientId("");  // Reset the selected ingredient
      }
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <div className="search-container">
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
            
            {/* Ingredient selection dropdown */}
            <select 
              value={ingredientId}
              onChange={handleIngredientChange}
              className="custom-placeholder"
            >
              <option value="">Selecciona un ingrediente</option>
              {availableIngredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <button type="submit" disabled={!ingredientId}>Añadir Ingrediente</button>
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
      </div>
    </div>
  );
}

export default SearchContainer;
