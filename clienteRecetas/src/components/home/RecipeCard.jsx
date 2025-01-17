import React from 'react';
import './RecipeCard.css';
import PopUp from './PopUp.jsx'

const RecipeCard = ({ result }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={result.image} className="card-img-top" alt={result.name} />
      <div className="card-body">
        <h5 className="card-title">{result.name}</h5>
        <PopUp result={result} /> 
      </div>
    </div>
  );
}

export default RecipeCard;