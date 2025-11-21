import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomMain() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suggestCategory, setSuggestCategory] = useState([]);
  const [suggestFood, setSuggestFood] = useState({});
  const [filterOn, setFilterOn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const randomSelect = () => {
    const randomFoodIndex = Math.floor(Math.random() * foods.length);
    const randomFood = foods[randomFoodIndex];

    setSuggestFood(randomFood);
  };

  const filterCategory = (selectedOption) => {
    const foodsCategory = foods.filter((food) => food.category_id === selectedOption.id);
    setSuggestCategory(foodsCategory);
  };
  
  const randomFilteredSelect = () => {
    const randomFilteredFoodIndex = Math.floor(Math.random() * suggestCategory.length);
    const randomFilteredFood = suggestCategory[randomFilteredFoodIndex];
    
    setSuggestFood(randomFilteredFood);
  };

  const toggleFilter = () => {
    setFilterOn((prevState) => !prevState);
    setSelectedCategory(null);
    setSuggestCategory([]);
  };
  
  
  useEffect(() => {
    axios.get("http://localhost:3000/categories")
    .then((response) => setCategories(response.data));

    axios.get("http://localhost:3000/foods")
    .then((response) => setFoods(response.data));
  }, []);

  useEffect(() => {
    if (suggestCategory.length > 0) {
      console.log("Category successfully updated:", suggestCategory); // these useEffects make it so that once something is selected, it automatically updates the data
    }
  }, [suggestCategory]);
  
  useEffect(() => {
    if (Object.keys(suggestFood).length > 0) {
      console.log("Suggested food successfully updated:", suggestFood);
    }
  }, [suggestFood]);
  
  return (
    <div className="random-box">
      <div className="container">
        <h2>Generate Random Selection</h2>
        <p>Do you want to generate a random suggestion based on category?</p>
        <button 
          className={`toggle-button ${filterOn ? 'active' : ''}`}
          onClick={toggleFilter}
        >
          {filterOn ? "Filter By Category" : "Completely Random"}
        </button>
        <br />
        {filterOn ? (
          <div>
            <h3>Select A Category</h3>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
                  onClick={() => {
                    filterCategory(category);
                    setSelectedCategory(category.id);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
            {suggestCategory.length > 0 && (
              <button 
                className="generate-button"
                onClick={() => randomFilteredSelect()}
              >
                GET SUGGESTION
              </button>
            )}
          </div>
        ) : (
          <button 
            className="generate-button"
            onClick={() => randomSelect()}
          >
            GET SUGGESTION
          </button>
        )}
      </div>

      {Object.keys(suggestFood).length > 0 && (
        <div className="suggestion-result">
          {categories.find((cat) => cat.id === suggestFood.category_id) ? (
            <h1>
              Your Suggestion: {categories.find((cat) => cat.id === suggestFood.category_id).name}
            </h1>
          ) : (
            <h1>Your Random Suggestion</h1>
          )}
          <hr />
          <div key={suggestFood.id} className="result-card">
            <h3>{suggestFood.name} ({suggestFood.style})</h3>
            <p><strong>Description:</strong> This {suggestFood.main_ingredient} dish is {suggestFood.taste}</p>
            <p><strong>Served:</strong> {suggestFood.temp}</p>
            {suggestFood.category_id < 4 && (
              <p><strong>Protein:</strong> {suggestFood.protein}</p>
            )}
            <p><strong>Cooking Method:</strong> {suggestFood.cooking_method}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RandomMain;