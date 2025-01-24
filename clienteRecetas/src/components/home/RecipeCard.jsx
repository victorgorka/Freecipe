import React from 'react';
import './RecipeCard.css';
import PopUp from './PopUp.jsx'

const RecipeCard = ({ result }) => {
  return (
    <div className="card" >
      <img src={result.image} className="image" alt={result.name} />
      <div className="card-body">
        <h5 className="title">{result.name}</h5>
        <PopUp result={result} /> 
      </div>
    </div>
  );
}

export default RecipeCard;