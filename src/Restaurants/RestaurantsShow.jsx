function RestaurantsShow({ restaurant, foods, categories }) {
  return (
    <div>
      <h1>{restaurant.name} located in {restaurant.location}</h1>
      <h3>{restaurant.style}</h3>
      <hr></hr>
      <div className="restaurant.menu-display">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="container">
              <h2>{category.name}</h2>
              {/* Filter foods by category.id and restaurant.id*/}
              {foods
                .filter((food) => food.category_id === category.id)
                .filter((food) => food.restaurant_id === restaurant.id)
                .map((food) => (
                  <div key={food.id}>
                    <p>{food.name}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsShow;