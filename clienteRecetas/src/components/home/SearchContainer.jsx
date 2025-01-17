import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./SearchContainer.css";
import { Link } from "react-router-dom";

function SearchContainer({ onSearch }) {
  const [rangeValue, setRangeValue] = useState(0);
  const [ingredientInput, setIngredientInput] = useState(""); // To store the typed input
  const [ingredients, setIngredients] = useState([]); // List of added ingredients
  const [availableIngredients, setAvailableIngredients] = useState([]); // List of available ingredients from the server
  const [isChecked, setIsChecked] = useState(false);

  // Handler to update the checkbox state when it is clicked
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // Set the state to true or false based on whether it's checked
  };

  // Fetch available ingredients from the server when the component mounts
  useEffect(() => {
    // Simulate an API call to fetch ingredients
    fetch("http://localhost:8080/ingredients")
      .then((response) => response.json())
      .then((data) => setAvailableIngredients(data)) // Update the available ingredients
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setIngredientInput(event.target.value);
  };

  const handleAddIngredient = (ingredientName) => {
    if (ingredientName) {
      setIngredients([...ingredients, ingredientName]);
      setIngredientInput(""); // Clear the input field
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const fetchRecipesByIngredients = () => {
    if (ingredients.length === 0) {
      console.log("No ingredients selected. Please select some ingredients before searching.");
      return; // Exit the function if no ingredients are selected
    }

    const queryParams = ingredients
      .map((ingredient) => `ingredients=${encodeURIComponent(ingredient)}`)
      .join("&");
    const url = `http://localhost:8080/recipes/byIngredients?${queryParams}` + "&flexible=" + isChecked;

    onSearch(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(url);
        console.log("Recipes:", data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  const filteredIngredients = availableIngredients.filter((ing) =>
    ing.name.toLowerCase().includes(ingredientInput.toLowerCase())
  );

  return (
    <div>
      <button>
        <Link to="/">HOME</Link>
      </button>
      <div className="search-container">
        <div className="search-filter">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const selectedIngredient = filteredIngredients[0];
              if (selectedIngredient) {
                handleAddIngredient(selectedIngredient.name);
              }
            }}
          >
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="flexible"
                value="true"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="flexible">
                <strong>Flexible</strong>
              </label>
            </div>
            <Form.Label>Tiempo: {rangeValue} minutos</Form.Label>
            <Form.Range max={120} value={rangeValue} onChange={handleRangeChange} />

            {/* Autocomplete Input for Ingredients */}
            <div className="autocomplete-container">
              <input
                type="text"
                value={ingredientInput}
                onChange={handleInputChange}
                placeholder="Selecciona un ingrediente"
              />
              {ingredientInput && (
                <ul className="autocomplete-list">
                  {filteredIngredients.map((ing) => (
                    <li
                      key={ing.id}
                      onClick={() => handleAddIngredient(ing.name)}
                      className="autocomplete-item"
                    >
                      {ing.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
          <button type="button" onClick={fetchRecipesByIngredients}>
            Recomendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchContainer;
