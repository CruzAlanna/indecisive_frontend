import axios from 'axios';
import { useState, useEffect } from 'react';
import MenuIndex from './MenuIndex';
import MenuShow from './MenuShow';
import '../styles/Menu.css';

function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFoodShowVisible, setIsFoodShowVisible] = useState(false);
  const [currentFood, setCurrentFood] = useState({});

  const handleIndex = () => {
    axios.get("http://localhost:3000/foods")
    .then((response) => {
      setFoods(response.data);
    })
    axios.get("http://localhost:3000/categories")
    .then((response) => {
      setCategories(response.data);
    })
  };

  const handleShow = (food) => {
    setIsFoodShowVisible(true);
    setCurrentFood(food);
  };

  const closeModal = () => {
    setIsFoodShowVisible(false);
  }

  // Close modal when pressing escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(handleIndex, []);

  return (
    <div className="menu-container">
      <MenuIndex 
        foods={foods} 
        categories={categories} 
        onShow={handleShow} 
      />
      
      {isFoodShowVisible && (
        <div className="food-modal-backdrop" onClick={closeModal}>
          <div className="food-modal" onClick={(e) => e.stopPropagation()}>
            <MenuShow food={currentFood} />
            <button className="close-modal-button" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuPage;