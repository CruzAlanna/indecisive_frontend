import axios from 'axios';
import { useState, useEffect } from 'react';
import MenuIndex from './MenuIndex';
import MenuShow from './MenuShow';
import { Modal } from '../Modal';

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

  useEffect(handleIndex, []); //see what taking this out does bc we're not updating the data

  return (
    <main>
      <div>
        <MenuIndex foods={foods} categories={categories} onShow={handleShow} />
        <Modal show={isFoodShowVisible} onClose={() => setIsFoodShowVisible(false)}>
          <MenuShow food={currentFood} />
        </Modal>
      </div>
    </main>
  )
}

export default MenuPage;