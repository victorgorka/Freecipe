import './RecipeCard.css'; 

const RecipeCard = () => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src="https://cdn.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4.jpg" className="card-img-top" alt="..." />
      <div className="card-body">
      <img src="https://cdn.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4.jpg" className="image" alt="imagen"/>
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

