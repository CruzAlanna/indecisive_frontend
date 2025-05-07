import { useState } from 'react';

function RestaurantsIndex({ restaurants, onShow }) {
  const [searchQuery, setSearchQuery] = useState('');
    const [searchAttribute, setSearchAttribute] = useState('name');
  
    const attributes = ['name', 'style'];
  
    const filteredRestaurants = restaurants.filter((restaurant) => {
      if (!searchQuery) return true;
      return restaurant[searchAttribute]?.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Restaurants</h1>
        <p>{restaurants.length} restaurants to browse!</p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={searchAttribute} onChange={(e) => setSearchAttribute(e.target.value)}>
          {attributes.map((attr) => (
            <option key={attr} value={attr}>{attr}</option>
          ))}
        </select>
      </div>

      <hr></hr>
      <div className="restaurant-display">
        {filteredRestaurants.map((restaurant) => (
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