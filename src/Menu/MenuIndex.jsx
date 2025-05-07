import { useState } from 'react';

function MenuIndex({ foods, categories, onShow }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAttribute, setSearchAttribute] = useState('name');

  const attributes = ['name', 'style', 'main_ingredient', 'temp', 'protein', 'taste', 'cooking_method'];

  const filteredFoods = foods.filter((food) => {
    if (!searchQuery) return true; // Show all if searchQuery is empty
    return food[searchAttribute]?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Menu</h1>
        <p>{foods.length} dishes to choose from!</p>
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
      <div className="menu-display">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="container">
              <h2>{category.name}</h2>
              {/* Filter foods by category.id */}
              {filteredFoods
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
    </div>
  )
}

export default MenuIndex;