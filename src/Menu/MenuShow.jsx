function MenuShow({ food }) {
  return (
    <div>
      <h1>{food.name}</h1>
      <h3>{food.style}</h3>
      <hr />
      <div className="food-detail">
        <span className="food-detail-label">Description: </span>
        This {food.main_ingredient} dish is {food.taste}
      </div>
      <div className="food-detail">
        <span className="food-detail-label">Served: </span>
        {food.temp}
      </div>
      {food.category_id < 4 && (
        <div className="food-detail">
          <span className="food-detail-label">Protein: </span>
          {food.protein}
        </div>
      )}
      <div className="food-detail">
        <span className="food-detail-label">Cooking Method: </span>
        {food.cooking_method}
      </div>
    </div>
  );
}

export default MenuShow;