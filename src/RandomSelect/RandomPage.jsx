import React from 'react';
import RandomMain from './RandomMain';
import '../styles/Random.css';

function RandomPage() {
  return (
    <div className="random-container">
      <h1>Random Dish Generator</h1>
      <p>Feeling adventurous? Let us suggest a random dish for you! You can choose to get a completely random suggestion or filter by category.</p>
      <RandomMain />
    </div>
  )
}

export default RandomPage;