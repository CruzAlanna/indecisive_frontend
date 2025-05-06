function RestaurantsIndex({ restaurants, onShow }) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Restaurants</h1>
        <p>{restaurants.length} restaurants to browse!</p>
      </div>
      <hr></hr>
      <div className="restaurant-display">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <div className="container">
              <h2>{restaurant.name}</h2>
              <p>{restaurant.style}</p>
              <button onClick={() => onShow(restaurant) }>View Restaurant Menu</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsIndex;