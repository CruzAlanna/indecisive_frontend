import { useState } from 'react';
import QuizMain from './QuizMain';
import QuizShow from './QuizShow';
import { Modal } from '../Modal';

function QuizPage() {
  const [isQuizShowVisible, setIsQuizShowVisible] = useState(false);

  const handleQuizShow = () => {
    setIsQuizShowVisible(true);
  };

  return (
    <main>
      <div>
        <QuizMain onShow={handleQuizShow} />
        <Modal show={isQuizShowVisible} onClose={() => setIsQuizShowVisible(false)}>
          <QuizShow />
        </Modal>
      </div>
    </main>
  )
}

export default QuizPage;