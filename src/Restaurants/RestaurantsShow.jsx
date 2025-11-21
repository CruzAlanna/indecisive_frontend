function RestaurantsShow({ restaurant, foods, categories }) {
  // Get foods for this restaurant
  const restaurantFoods = foods.filter(food => food.restaurant_id === restaurant.id);
  
  return (
    <div>
      <h1>{restaurant.name}</h1>
      <h3>{restaurant.style} • {restaurant.location}</h3>
      <hr />
      
      {categories.map((category) => {
        // Get foods for this category in this restaurant
        const categoryFoods = restaurantFoods.filter(food => food.category_id === category.id);
        
        // Only show categories that have foods
        if (categoryFoods.length > 0) {
          return (
            <div key={category.id} className="restaurant-menu-section">
              <h2>{category.name}</h2>
              {categoryFoods.map((food) => (
                <div key={food.id} className="restaurant-menu-item">
                  <p><strong>{food.name}</strong> • {food.main_ingredient}, {food.taste}</p>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
      
      {restaurantFoods.length === 0 && (
        <p>No menu items available for this restaurant.</p>
      )}
    </div>
  );
}

export default RestaurantsShow;