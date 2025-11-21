import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuizShow() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
  const [suggestions, setSuggestions] = useState([]); // Foods filtered by answers
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dessertCheck, setDessertCheck]= useState(false);

  const handleSelection = (selectedOption) => {
    setSelectedOptions((prevSelections) => 
      prevSelections.includes(selectedOption) ? prevSelections.filter((selections) => selections !== selectedOption) : [...prevSelections, selectedOption]
    );
  }

  const handleNextQuestion = () => {
    if (currentQuestion === 0) {
      const foodsCategory = foods.filter((food) => 
        selectedOptions.some(option => food.category_id === option.id)
      );
      setSuggestions(foodsCategory);
      if (selectedOptions.length === 1 && selectedOptions.some(option => option.id === 4)) {
        setDessertCheck(true);
      };
    } else if (currentQuestion === 1) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.style === option.style)
      );
      setSuggestions(filteredFoods);
    } else if (currentQuestion === 2) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.main_ingredient === option.main_ingredient)
      );
      setSuggestions(filteredFoods);
    } else if (currentQuestion === 3) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.temp === option.temp)
      );
      setSuggestions(filteredFoods);
    } else if (currentQuestion === 4) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.protein === option.protein)
      );
      setSuggestions(filteredFoods);
    } else if (currentQuestion === 5) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.taste === option.taste)
      );
      setSuggestions(filteredFoods);
    } else if (currentQuestion === 6) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.cooking_method === option.cooking_method)
      );
      setSuggestions(filteredFoods);
    }
    setCurrentQuestion((prevIndex) => prevIndex + 1);
    setSelectedOptions([]);
  };

  const handleDessertsNextQuestion = () => {
    if (currentQuestion === 3) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.temp === option.temp)
      );
      setSuggestions(filteredFoods);
    } else if (currentQuestion === 4) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.protein === option.protein)
      );
      setSuggestions(filteredFoods);
    } else if (currentQuestion === 5) {
      var filteredFoods = suggestions.filter((food) => 
        selectedOptions.some(option => food.taste === option.taste)
    );
      setSuggestions(filteredFoods);
    }
    setCurrentQuestion((prevIndex) => prevIndex + 2);
    setSelectedOptions([]);
  };
  
  const handleSkip = () => {
    setCurrentQuestion((prevIndex) => prevIndex + 1);
    setSelectedOptions([]);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/questions")
    .then((response) => setQuestions(response.data));

    axios.get("http://localhost:3000/categories")
    .then((response) => setCategories(response.data));

    axios.get("http://localhost:3000/foods")
    .then((response) => setFoods(response.data));
  }, []);

  return (
    <div className="quiz-box">
      {questions.length > 0 && currentQuestion < questions.length ? (
        <div>
          <h2>{questions[currentQuestion].q}</h2>
          <div className="options-grid">
            {(() => {
              switch (currentQuestion) {
                case 0:
                  return categories.map((category) => (
                    <button
                      key={category.id}
                      className={`option-button ${selectedOptions.includes(category) ? 'selected' : ''}`}
                      onClick={() => handleSelection(category)}
                    >
                      {category.name}
                    </button>
                  ));
                case 1:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.style === food.style)
                  )
                  .map((food) => (
                    <button
                      key={food.id}
                      className={`option-button ${selectedOptions.includes(food) ? 'selected' : ''}`}
                      onClick={() => handleSelection(food)}
                    >
                      {food.style}
                    </button>
                  ));
                case 2:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.main_ingredient === food.main_ingredient)
                  )
                  .map((food) => (
                    <button
                      key={food.id}
                      className={`option-button ${selectedOptions.includes(food) ? 'selected' : ''}`}
                      onClick={() => handleSelection(food)}
                    >
                      {food.main_ingredient}
                    </button>
                  ));
                case 3:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.temp === food.temp)
                  )
                  .map((food) => (
                    <button
                      key={food.id}
                      className={`option-button ${selectedOptions.includes(food) ? 'selected' : ''}`}
                      onClick={() => handleSelection(food)}
                    >
                      {food.temp}
                    </button>
                  ));
                case 4:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.protein === food.protein)
                  )
                  .map((food) => (
                    <button
                      key={food.id}
                      className={`option-button ${selectedOptions.includes(food) ? 'selected' : ''}`}
                      onClick={() => handleSelection(food)}
                    >
                      {food.protein}
                    </button>
                  ));
                case 5:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.taste === food.taste)
                  )
                  .map((food) => (
                    <button
                      key={food.id}
                      className={`option-button ${selectedOptions.includes(food) ? 'selected' : ''}`}
                      onClick={() => handleSelection(food)}
                    >
                      {food.taste}
                    </button>
                  ));
                case 6:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.cooking_method === food.cooking_method)
                  )
                  .map((food) => (
                    <button
                      key={food.id}
                      className={`option-button ${selectedOptions.includes(food) ? 'selected' : ''}`}
                      onClick={() => handleSelection(food)}
                    >
                      {food.cooking_method}
                    </button>
                  ));
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      ) : (
        <h1 className="slide-up">Quiz Completed!</h1>
      )}
  
      {currentQuestion < questions.length ? (
        <div className="quiz-actions">
          <button
            className="skip-button special-button"
            onClick={() => handleSkip()}
          >
            SKIP
          </button>
          
          {currentQuestion < 3 && selectedOptions.length > 0 ? (
            <button 
              className="next-button special-button"
              onClick={() => handleNextQuestion()}
            >
              NEXT
            </button>
          ) : currentQuestion === 3 && selectedOptions.length > 0 ? (
            <div>
              {dessertCheck ? (
                <button 
                  className="next-button special-button"
                  onClick={() => handleDessertsNextQuestion()}
                >
                  NEXT
                </button>
              ) : (
                <button 
                  className="next-button special-button"
                  onClick={() => handleNextQuestion()}
                >
                  NEXT
                </button>
              )}
            </div>
          ) : currentQuestion > 3 && selectedOptions.length > 0 ? (
            <button
              className="next-button special-button"
              onClick={() => handleNextQuestion()}
            >
              NEXT
            </button>
          ) : null}
        </div>
      ) : null}

      {currentQuestion >= questions.length ? (
        <div className="results-container">
          <h1>Your Suggestions:</h1>
          <hr />
          {suggestions.length === 0 ? (
            <p>No suggestions found. Please try the quiz again with different preferences.</p>
          ) : (
            suggestions.map((food) => (
              <div key={food.id} className="food-card">
                <h3>
                  {food.name} ({food.style})
                </h3>
                <p><strong>Description:</strong> This {food.main_ingredient} dish is {food.taste}</p>
                <p><strong>Served:</strong> {food.temp}</p>
                {food.category_id < 4 && (
                  <p><strong>Protein:</strong> {food.protein}</p>
                )}
                <p><strong>Cooking Method:</strong> {food.cooking_method}</p>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export default QuizShow;