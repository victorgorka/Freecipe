import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null); // New state to hold image file
  const navigate = useNavigate();

  // Fetch user data based on token
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found, please log in.");
        navigate("/login");
        return;
      }

      try {
        // Send the token in the headers to verify the user
        const response = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the response contains user data (including user ID)
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle Add Recipe
  const handleAddRecipe = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in.");
      return;
    }

    const recipeData = {
      name: recipeName,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      instructions: instructions.split('.').map(instruction => instruction.trim()),
      userId: userData?.id, // Use the user data retrieved from backend
    };

    // Prepare FormData to send both the recipe and image
    const formData = new FormData();
    formData.append("recipe", JSON.stringify(recipeData)); // Send recipe data as JSON string
    formData.append("file", image); // Append the image file

    try {
      const response = await axiosInstance.post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Recipe added:', response.data);
      alert('Recipe added successfully!');
      navigate("/search");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("There was an error adding the recipe.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <button>
        <Link to="/search">CONTINUAR</Link>
      </button>
      {userData ? (
        <div>
          <h1>Bienvenido, {userData.name}</h1>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>

          {/* Add Recipe Form */}
          <h2>Añadir Receta</h2>
          <form className="new-recipe-form" onSubmit={handleAddRecipe}>
            <div>
              <label>Nombre de la receta:</label>
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Ingredientes (separados por comas):</label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Instrucciones (separado por puntos):</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Imagen:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])} // Handle file input
              />
            </div>
            <button type="submit">Añadir Receta</button>
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default UserProfile;
