import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiUrl } from '../api';
import RestaurantsIndex from './RestaurantsIndex';
import RestaurantsShow from './RestaurantsShow';
import { Modal } from '../Modal';
import '../styles/Restaurants.css';

function RestaurantsPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isRestaurantShowVisible, setIsRestaurantShowVisible] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState({});

  const handleIndex = () => {
    axios.get(apiUrl('/foods'))
    .then((response) => {
      setFoods(response.data);
    })
    axios.get(apiUrl('/categories'))
    .then((response) => {
      setCategories(response.data);
    })
    axios.get(apiUrl('/restaurants'))
    .then((response) => {
      setRestaurants(response.data);
    })
  };

  const handleRestaurantShow = (restaurant) => {
    setIsRestaurantShowVisible(true);
    setCurrentRestaurant(restaurant);
  };

  const closeModal = () => {
    setIsRestaurantShowVisible(false);
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
    <div className="restaurants-container">
      <RestaurantsIndex 
        restaurants={restaurants} 
        onShow={handleRestaurantShow} 
      />
      
      {isRestaurantShowVisible && (
        <div className="restaurant-modal-backdrop" onClick={closeModal}>
          <div className="restaurant-modal" onClick={(e) => e.stopPropagation()}>
            <RestaurantsShow 
              restaurant={currentRestaurant} 
              foods={foods} 
              categories={categories} 
            />
            <button className="close-modal-button" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantsPage;