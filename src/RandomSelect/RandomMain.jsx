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
    <main>
      <div className="container">
        <h1>Random Dish Generator</h1>
        <p>Our Random Dish Generator will suggest a dish from our menu for you! You can choose to be given a completely random suggestion or you can select either entree, appetizer, snack, or dessert to get a random dish from that specific category!</p>
      </div>
      <hr></hr>
      <div className="container">
        <h2>Generate Random Selection</h2>
        <h3>Do you want to generate a random suggestion based on category?</h3>
        <button onClick={toggleFilter}>
          {filterOn ? "YES" : "NO"}
        </button>
        <br></br>
        {filterOn ? (
          <div>
            <h3>Select A Category</h3>
            {categories.map((category) => (
              <button
              key={category.id}
              onClick={() => {
                filterCategory(category);
                setSelectedCategory(category.id);
              }}
              style={{
                backgroundColor: selectedCategory === category.id ? "lightblue" : "white",
              }}
              >
              {category.name}
              </button>
            ))}
            <br></br>
            {suggestCategory.length === 0 ? (
              null
            ) : (
              <button onClick={() => randomFilteredSelect()}>GET SUGGESTION</button>
            ) }
          </div>
        ) : (
          <button onClick={() => randomSelect()}>GET SUGGESTION</button>
        )}
      </div>

      <div className="container">
        {Object.keys(suggestFood).length === 0 ? (
          null
        ) : (
          <div className="container">
            {categories.find((cat) => cat.id === suggestFood.category_id) ? (
              <div>
                <h1>
                  Your Suggestion: ({categories.find((cat) => cat.id === suggestFood.category_id).name})
                </h1>
              </div>
            ) : (
              <div>
                <h1>No Category Found</h1>
              </div>
            )}
            <hr></hr>
            <div key={suggestFood.id}>
              <h3>{suggestFood.name} ({suggestFood.style})</h3>
              <p>Description: This {suggestFood.main_ingredient} dish is {suggestFood.taste}</p>
              <p>Served: {suggestFood.temp}</p>
              {suggestFood.category_id < 4 ? (
                <div>
                  <p>Protein: {suggestFood.protein}</p>
                </div>
              ) : null }
              <p>Cooking Method: {suggestFood.cooking_method}</p>
              <hr></hr>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default RandomMain;