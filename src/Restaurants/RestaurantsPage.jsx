import axios from 'axios';
import { useState, useEffect } from 'react';
import RestaurantsIndex from './RestaurantsIndex';
import RestaurantsShow from './RestaurantsShow';
import { Modal } from '../Modal';

function RestaurantsPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isRestaurantShowVisible, setIsRestaurantShowVisible] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState({});

  const handleIndex = () => {
    axios.get("http://localhost:3000/foods")
    .then((response) => {
      setFoods(response.data);
    })
    axios.get("http://localhost:3000/categories")
    .then((response) => {
      setCategories(response.data);
    })
    axios.get("http://localhost:3000/restaurants")
    .then((response) => {
      setRestaurants(response.data);
    })
  };

  const handleRestaurantShow = (restaurant) => {
    setIsRestaurantShowVisible(true);
    setCurrentRestaurant(restaurant);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <div>
        <RestaurantsIndex restaurants={restaurants} onShow={handleRestaurantShow} />
        <Modal show={isRestaurantShowVisible} onClose={() => setIsRestaurantShowVisible(false)}>
          <RestaurantsShow restaurant={currentRestaurant} foods={foods} categories={categories} />
        </Modal>
      </div>
    </main>
  )
}

export default RestaurantsPage;