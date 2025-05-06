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
  
  const handleNextQuestion = (selectedOption) => {
    if (currentQuestion === 0) {
      const foodsCategory = foods.filter((food) => food.category_id === selectedOption.id);
      setP1Suggestions(foodsCategory);
      setP2Suggestions(foodsCategory);
      console.log(p1Suggestions);
      console.log(p2Suggestions);
    } else if (currentQuestion === 1) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.style === selectedOption.style);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.style === selectedOption.style);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    } else if (currentQuestion === 2) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.main_ingredient === selectedOption.main_ingredient);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.main_ingredient === selectedOption.main_ingredient);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    } else if (currentQuestion === 3) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.temp === selectedOption.temp);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.temp === selectedOption.temp);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    } else if (currentQuestion === 4) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.protein === selectedOption.protein);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.protein === selectedOption.protein);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    } else if (currentQuestion === 5) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.taste === selectedOption.taste);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.taste === selectedOption.taste);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    } else if (currentQuestion === 6) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.cooking_method === selectedOption.cooking_method);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.cooking_method === selectedOption.cooking_method);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    }
    setCurrentQuestion((prevIndex) => prevIndex + 1);
  };
  
  const handleDessertsNextQuestion = (selectedOption) => {
    if (currentQuestion === 3) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.temp === selectedOption.temp);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.temp === selectedOption.temp);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    } else if (currentQuestion === 4) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.protein === selectedOption.protein);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.protein === selectedOption.protein);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    } else if (currentQuestion === 5) {
      if (currentPartner === 0) {
        var filteredFoods1 = p1Suggestions.filter((food) => food.taste === selectedOption.taste);
        setP1Suggestions(filteredFoods1);
        console.log(p1Suggestions);
      } else if (currentPartner === 1) {
        var filteredFoods2 = p2Suggestions.filter((food) => food.taste === selectedOption.taste);
        setP2Suggestions(filteredFoods2);
        console.log(p2Suggestions);
      };
    };
    setCurrentQuestion((prevIndex) => prevIndex + 2);
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
                      return p1Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.style === food.style)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.style}
                        </button>
                      ));
                    case 2:
                      return p1Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.main_ingredient === food.main_ingredient)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.main_ingredient}
                        </button>
                      ));
                    case 3:
                      return p1Suggestions
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
                      return p1Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.protein === food.protein)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.protein}
                        </button>
                      ));
                    case 5:
                      return p1Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.taste === food.taste)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.taste}
                        </button>
                      ));
                    case 6:
                      return p1Suggestions
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
            <div>
              <h1>Halfway There!</h1>
              <h2>Partner Two: It's Your Turn</h2>
              <button onClick={() => handleNextPartner() }>
                Start Quiz -Part Two-
              </button>
            </div>
          )}
        </div>
      ) : null }

      {currentPartner === 1 ? (
        <div className="quiz-box">
          {questions.length > 0 && currentQuestion < questions.length ? (
            <div>
              <h2>{questions[currentQuestion].q}</h2>
              <div>
                {(() => {
                  switch (currentQuestion) {
                    case 0: //SHOULDNT BE CALLED
                      return categories.map((category) => (
                        <button key={category.id} onClick={() => handleNextQuestion(category)}>
                          {category.name}
                        </button>
                      ));
                    case 1:
                      return p2Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.style === food.style)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.style}
                        </button>
                      ));
                    case 2:
                      return p2Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.main_ingredient === food.main_ingredient)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.main_ingredient}
                        </button>
                      ));
                    case 3:
                      return p2Suggestions
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
                      return p2Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.protein === food.protein)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.protein}
                        </button>
                      ));
                    case 5:
                      return p2Suggestions
                      .filter((food, index, self) =>
                        index === self.findIndex(f => f.taste === food.taste)
                      )
                      .map((food) => (
                        <button key={food.id} onClick={() => handleNextQuestion(food)}>
                          {food.taste}
                        </button>
                      ));
                    case 6:
                      return p2Suggestions
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
            <div>
              <h1>Couple's Quiz Completed!</h1>
              <button onClick={() => handleSuggestions() }>
                Get Suggestions!
              </button>
              {checkMatching === 0 ? (
                <div>
                  <h2>OH NO! You have no matching dishes!</h2>
                  <h3>Time to compromise...or play Rock, Paper, Scissors to decide.</h3>
                  <h3>Here are you and your partner's unique suggestions! Look over and discuss, have fun!</h3>
                  <hr></hr>
                  <h1>Person 1:</h1>
                  {p1Suggestions.map((food) => (
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
                      <hr></hr>
                    </div>
                  ))}
                  <hr></hr>
                  <h1>Person 2:</h1>
                  {p2Suggestions.map((food) => (
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
                      <hr></hr>
                    </div>
                  ))}
                </div>
              ) : checkMatching > 0 ? (
                <div>
                  <h1>Your Matching Suggestions:</h1>
                  <hr></hr>
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
              ) : null }
            </div>
          )}
        </div>
      ) : null }
  
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
    </div>
  );  
}

export default CouplesShow;