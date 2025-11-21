import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CouplesShow() {
  const [partners, setPartners] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Current question index
  const [currentPartner, setCurrentPartner] = useState(0); // Current person index
  const [p1Suggestions, setP1Suggestions] = useState([]); // Foods filtered by answers for PARTNER1/ PERSON1
  const [p2Suggestions, setP2Suggestions] = useState([]); // Foods filtered by answers for PARTNER2/ PERSON2
  const [suggestions, setSuggestions] = useState([]); // For combined arrays
  const [checkMatching, setCheckMatching] = useState(null);
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
      setP1Suggestions(foodsCategory);
      setP2Suggestions(foodsCategory);
      if (selectedOptions.length === 1 && selectedOptions.some(option => option.id === 4)) {
        setDessertCheck(true);
      };
    } else if (currentQuestion === 1) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.style === option.style)
        );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => 
          selectedOptions.some(option => food.style === option.style)
        );
        setP2Suggestions(filteredFoods2);
      };
    } else if (currentQuestion === 2) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.main_ingredient === option.main_ingredient)
        );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.main_ingredient === option.main_ingredient)
        );
        setP2Suggestions(filteredFoods2);
      };
    } else if (currentQuestion === 3) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.temp === option.temp)
        );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.temp === option.temp)
        );
        setP2Suggestions(filteredFoods2);
      };
    } else if (currentQuestion === 4) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.protein === option.protein)
        );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.protein === option.protein)
        );
        setP2Suggestions(filteredFoods2);
      };
    } else if (currentQuestion === 5) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.taste === option.taste)
       );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.taste === option.taste)
        );
        setP2Suggestions(filteredFoods2);
      };
    } else if (currentQuestion === 6) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.cooking_method === option.cooking_method)
        );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.cooking_method === option.cooking_method)
        );
        setP2Suggestions(filteredFoods2);
      };
    }
    setCurrentQuestion((prevIndex) => prevIndex + 1);
    setSelectedOptions([]);
  };
  
  const handleDessertsNextQuestion = () => {
    if (currentQuestion === 3) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.temp === option.temp)
        );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.temp === option.temp)
        );
        setP2Suggestions(filteredFoods2);
      };
    } else if (currentQuestion === 4) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.protein === option.protein)
        );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.protein === option.protein)
        );
        setP2Suggestions(filteredFoods2);
      };
    } else if (currentQuestion === 5) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) =>
          selectedOptions.some(option => food.taste === option.taste)
       );
        setP1Suggestions(filteredFoods1);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) =>
          selectedOptions.some(option => food.taste === option.taste)
        );
        setP2Suggestions(filteredFoods2);
      };
    }
    setCurrentQuestion((prevIndex) => prevIndex + 2);
    setSelectedOptions([]);
  };

  const handleSkip = () => {
    setCurrentQuestion((prevIndex) => prevIndex + 1);
    setSelectedOptions([]);
  };

  const handleNextPartner = () => {
    setCurrentPartner((prevIndex) => prevIndex + 1);
    setCurrentQuestion(1);
  };

  const handleSuggestions = () => {
    const set1 = new Set(p1Suggestions);
    const duplicates = p2Suggestions.filter(food => set1.has(food));
    setSuggestions(duplicates);
    setCheckMatching(duplicates.length)
  };

  useEffect(() => {
    axios.get("http://localhost:3000/partners")
    .then((response) => setPartners(response.data));
    console.log(partners); // just here so it is not "unused"

    axios.get("http://localhost:3000/questions")
    .then((response) => setQuestions(response.data));

    axios.get("http://localhost:3000/categories")
    .then((response) => setCategories(response.data));

    axios.get("http://localhost:3000/foods")
    .then((response) => setFoods(response.data));
  }, []);

  return (
    <div>
      {currentPartner === 0 ? (
        <div className="quiz-box">
          <div className="partner-indicator">Person 1's Turn</div>
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
                      return p1Suggestions
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
                      return p1Suggestions
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
                      return p1Suggestions
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
                      return p1Suggestions
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
                      return p1Suggestions
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
                      return p1Suggestions
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
            <div className="slide-up">
              <h1>Halfway There!</h1>
              <h2>Partner Two: It's Your Turn</h2>
              <button 
                className="next-button special-button"
                onClick={() => handleNextPartner()}
              >
                Start Quiz -Part Two-
              </button>
            </div>
          )}
        </div>
      ) : null}

      {currentPartner === 1 ? (
        <div className="quiz-box">
          <div className="partner-indicator">Person 2's Turn</div>
          {questions.length > 0 && currentQuestion < questions.length ? (
            <div>
              <h2>{questions[currentQuestion].q}</h2>
              <div className="options-grid">
                {(() => {
                  switch (currentQuestion) {
                    case 0: //SHOULDNT BE CALLED
                      return null;
                    case 1:
                      return p2Suggestions
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
                      return p2Suggestions
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
                      return p2Suggestions
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
                      return p2Suggestions
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
                      return p2Suggestions
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
                      return p2Suggestions
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
            <div className="slide-up">
              <h1>Couple's Quiz Completed!</h1>
              <button 
                className="next-button special-button"
                onClick={() => handleSuggestions()}
              >
                Get Suggestions!
              </button>
              
              {checkMatching === 0 ? (
                <div className="results-container">
                  <div className="matching-result">
                    <h2>OH NO! You have no matching dishes!</h2>
                    <p>Time to compromise...or play Rock, Paper, Scissors to decide.</p>
                    <p>Here are you and your partner's unique suggestions! Look over and discuss, have fun!</p>
                  </div>
                  
                  <div>
                    <h2>Person 1's Preferences:</h2>
                    {p1Suggestions.map((food) => (
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
                    ))}
                  </div>
                  
                  <div>
                    <h2>Person 2's Preferences:</h2>
                    {p2Suggestions.map((food) => (
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
                    ))}
                  </div>
                </div>
              ) : checkMatching > 0 ? (
                <div className="results-container">
                  <div className="matching-result">
                    <h2>Great news! We found {checkMatching} matching dishes for you both!</h2>
                  </div>
                  
                  <h1>Your Matching Suggestions:</h1>
                  <hr />
                  {suggestions.map((food) => (
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
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
  
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
    </div>
  );  
}

export default CouplesShow;