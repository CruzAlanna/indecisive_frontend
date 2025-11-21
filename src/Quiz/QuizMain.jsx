function QuizMain({ onShow }) {
  return (
    <main>
      <div className="container">
        <h1>Foods Quiz</h1>
        <p>Answer a few questions about what you're in the mood for and we'll suggest some foods that match your preferences!</p>
        <button onClick={() => onShow() }>Start Quiz!</button>
      </div>
    </main>
  )
}

export default QuizMain;