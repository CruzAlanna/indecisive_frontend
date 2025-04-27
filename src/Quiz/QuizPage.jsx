import axios from 'axios';
import { useState, useEffect } from 'react';
import QuizMain from './QuizMain';
import QuizShow from './QuizShow';
import { Modal } from '../Modal';

function QuizPage() {
  // const [foods, setFoods] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isQuizShowVisible, setIsQuizShowVisible] = useState(false);

  const handleQuizShow = () => {
    axios.get("http://localhost:3000/foods") //using the data in the show not the main page
    .then((response) => {
      // setFoods(response.data);
    })
    axios.get("http://localhost:3000/categories")
    .then((response) => {
      // setCategories(response.data);
    })
    axios.get("http://localhost:3000/questions")
    .then((response) => {
      setQuestions(response.data);
    })
    setIsQuizShowVisible(true);
  };

  useEffect(handleQuizShow, []);

  return (
    <main>
      <div>
        <QuizMain onShow={handleQuizShow} />
        <Modal show={isQuizShowVisible} onClose={() => setIsQuizShowVisible(false)}>
          <QuizShow questions={questions} />
        </Modal>
      </div>
    </main>
  )
}

export default QuizPage;