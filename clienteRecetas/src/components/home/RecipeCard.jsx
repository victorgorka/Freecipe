import './RecipeCard.css'; 

const RecipeCard = () => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src="https://via.placeholder.com/150" className="card-img-top" alt="..." />
      <div className="card-body">
      <img src="https://via.placeholder.com/150" className="image" alt="imagen"/>
        <div className="text-container">
          <h5 className="title">Spaghetti</h5>
          <p className="calories"> 157Cal - 100gr.</p>
          <a href="#" className="button">Ver receta</a>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;

