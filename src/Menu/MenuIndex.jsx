function MenuIndex({ foods, categories, onShow }) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Menu</h1>
        <p>-({foods.length}) dishes to choose from!-</p>
      </div>
      <hr></hr>
      {categories.map((category) => (
        <div key={category.id}>
          <div className="container">
            <h2>{category.name}</h2>
            {/* Filter foods by category.id */}
            {foods
              .filter((food) => food.category_id === category.id)
              .map((food) => (
                <div key={food.id}>
                  <p>{food.name}</p>
                  <button onClick={() => onShow(food) }>View Dish Details</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuIndex;