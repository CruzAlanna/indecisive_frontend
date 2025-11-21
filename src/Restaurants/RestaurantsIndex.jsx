import { useState } from 'react';

function RestaurantsIndex({ restaurants, onShow }) {
  const [searchQuery, setSearchQuery] = useState('');
    const [searchAttribute, setSearchAttribute] = useState('name');
  
    const attributeLabels = {
      name: "Restaurant Name",
      style: "Cuisine Style"
    };
  
    const attributeKeys = Object.keys(attributeLabels);

    const filteredRestaurants = restaurants.filter((restaurant) => {
      if (!searchQuery) return true;
      return restaurant[searchAttribute]?.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div>
      <div>
        <h1>Restaurants</h1>
        <p>{restaurants.length} restaurants to browse!</p>
      </div>

      <div className="restaurants-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={searchAttribute} onChange={(e) => setSearchAttribute(e.target.value)}>
          {attributeKeys.map((attr) => (
            <option key={attr} value={attr}>
              {attributeLabels[attr]}
            </option>
          ))}
        </select>
      </div>

      <hr />
      <div className="restaurant-display">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.style} • {restaurant.location}</p>
            <button 
              onClick={() => onShow(restaurant)}
            >
              View Restaurant Menu
            </button>
          </div>
        ))}
        {filteredRestaurants.length === 0 && (
          <p>No restaurants found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantsIndex;