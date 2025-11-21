import { useState } from 'react';

function MenuIndex({ foods, categories, onShow }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAttribute, setSearchAttribute] = useState('name');

    // Map database attributes to readable names
    const attributeLabels = {
      name: "Dish Name",
      style: "Cuisine Style",
      main_ingredient: "Main Ingredient",
      temp: "Serving Temperature",
      protein: "Protein",
      taste: "Flavor Profile",
      cooking_method: "Cooking Method",
    };
  
    // Convert object keys into an array for dropdown options
    const attributeKeys = Object.keys(attributeLabels);

  const filteredFoods = foods.filter((food) => {
    if (!searchQuery) return true; // Show all if searchQuery is empty
    return food[searchAttribute]?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div>
        <h1>Menu</h1>
        <p>{foods.length} dishes to choose from!</p>
      </div>

      <div className="search-bar">
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
      <div className="menu-display">
        {categories.map((category) => (
          <div key={category.id} className="category-section">
            <h2>{category.name}</h2>
            {/* Filter foods by category.id */}
            {filteredFoods
              .filter((food) => food.category_id === category.id)
              .map((food) => (
                <div key={food.id} className="menu-item">
                  <div className="menu-item-name">{food.name}</div>
                  <button 
                    className="menu-item-button"
                    onClick={() => onShow(food)}
                  >
                    View Details
                  </button>
                </div>
              ))}
              {filteredFoods.filter(food => food.category_id === category.id).length === 0 && (
                <p>No {category.name.toLowerCase()} found.</p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuIndex;