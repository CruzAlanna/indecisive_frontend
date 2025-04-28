function MenuShow({ food }) {
  return (
    <div>
      <h1>{food.name}</h1>
      <h3>{food.style}</h3>
      <hr></hr>
      <p>Description: This {food.main_ingredient} dish is {food.taste}</p>
      <p>Served: {food.temp}</p>
      {food.category_id < 4 ? (
        <div>
          <p>Protein: {food.protein}</p>
        </div>
      ) : null }
      <p>Cooking Method: {food.cooking_method}</p>
    </div>
  )
}

export default MenuShow;