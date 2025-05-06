import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuizShow() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
  const [suggestions, setSuggestions] = useState([]); // Foods filtered by answers

  const handleNextQuestion = (selectedOption) => {
    if (currentQuestion === 0) {
      const foodsCategory = foods.filter((food) => food.category_id === selectedOption.id);
      setSuggestions(foodsCategory);
      console.log(suggestions)
    } else if (currentQuestion === 1) {
      var filteredFoods = suggestions.filter((food) => food.style === selectedOption.style);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    } else if (currentQuestion === 2) {
      var filteredFoods = suggestions.filter((food) => food.main_ingredient === selectedOption.main_ingredient);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    } else if (currentQuestion === 3) {
      var filteredFoods = suggestions.filter((food) => food.temp === selectedOption.temp);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    } else if (currentQuestion === 4) {
      var filteredFoods = suggestions.filter((food) => food.protein === selectedOption.protein);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    } else if (currentQuestion === 5) {
      var filteredFoods = suggestions.filter((food) => food.taste === selectedOption.taste);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    } else if (currentQuestion === 6) {
      var filteredFoods = suggestions.filter((food) => food.cooking_method === selectedOption.cooking_method);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    }
    setCurrentQuestion((prevIndex) => prevIndex + 1);
  };

  const handleDessertsNextQuestion = (selectedOption) => {
    if (currentQuestion === 3) {
      var filteredFoods = suggestions.filter((food) => food.temp === selectedOption.temp);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    } else if (currentQuestion === 4) {
      var filteredFoods = suggestions.filter((food) => food.protein === selectedOption.protein);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    } else if (currentQuestion === 5) {
      var filteredFoods = suggestions.filter((food) => food.taste === selectedOption.taste);
      setSuggestions(filteredFoods);
      console.log(suggestions)
    }
    setCurrentQuestion((prevIndex) => prevIndex + 2);
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
          <div>
            {(() => {
              switch (currentQuestion) {
                case 0:
                  return categories.map((category) => (
                    <button key={category.id} onClick={() => handleNextQuestion(category)}>
                      {category.name}
                    </button>
                  ));
                case 1:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.style === food.style)
                  )
                  .map((food) => (
                    <div key={food.id}>
                      <button key={food.id} onClick={() => handleNextQuestion(food)}>
                        {food.style}
                      </button>
                    </div>
                  ));
                case 2:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.main_ingredient === food.main_ingredient)
                  )
                  .map((food) => (
                    <button key={food.id} onClick={() => handleNextQuestion(food)}>
                      {food.main_ingredient}
                    </button>
                  ));
                case 3:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.temp === food.temp)
                  )
                  .map((food) => (
                    <div key={food.id}>
                      {food.category_id < 4 ? (
                        <button onClick={() => handleNextQuestion(food)}>
                          {food.temp}
                        </button>
                      ) : (
                        <button onClick={() => handleDessertsNextQuestion(food)}>
                          {food.temp}
                        </button>
                      )}
                    </div>
                  ));
                case 4:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.protein === food.protein)
                  )
                  .map((food) => (
                    <button key={food.id} onClick={() => handleNextQuestion(food)}>
                      {food.protein}
                    </button>
                  ));
                case 5:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.taste === food.taste)
                  )
                  .map((food) => (
                    <button key={food.id} onClick={() => handleNextQuestion(food)}>
                      {food.taste}
                    </button>
                  ));
                case 6:
                  return suggestions
                  .filter((food, index, self) =>
                    index === self.findIndex(f => f.cooking_method === food.cooking_method)
                  )
                  .map((food) => (
                    <button key={food.id} onClick={() => handleNextQuestion(food)}>
                      {food.cooking_method}
                    </button>
                  ));
              }
            })()}
          </div>
        </div>
      ) : (
        <h1>Quiz Completed!</h1>
      )}
  
      {currentQuestion < questions.length ? (
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#d15b38",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => setCurrentQuestion((prevIndex) => prevIndex + 1)}
        >
          SKIP
        </button>
      ) : null}
  
      {currentQuestion >= questions.length ? (
        <div>
          <h1>Your Suggestions:</h1>
          <hr />
          {suggestions.map((food) => (
            <div key={food.id}>
              <h3>
                {food.name} ({food.style})
              </h3>
              <p>Description: This {food.main_ingredient} dish is {food.taste}</p>
              <p>Served: {food.temp}</p>
              {food.category_id < 4 ? (
                <div>
                  <p>Protein: {food.protein}</p>
                </div>
              ) : null}
              <p>Cooking Method: {food.cooking_method}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );   
}

export default QuizShow;