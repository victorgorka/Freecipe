import './RecipeCard.css'; 

const RecipeCard = () => {
  return (
  <div className="card" >
    <div className='Image-container'>
      <div className='color'></div>
      <img src="./Img/spagetti.jpg" className="image" alt="..." /> 
    </div>
    <div className="text-container">
          <h5 className="title">Spaghetti</h5>
          <p className="calories"> 157Cal - 100gr.</p>
          <a href="#" className="button">Ver receta</a>
        
    </div>
  </div>
  );
}

export default RecipeCard;

