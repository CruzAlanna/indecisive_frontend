function CouplesMain({ onShow }) {
  return (
    <main>
      <div className="quiz-container">
        <h1>Couple's Foods Quiz</h1>
        <p>Take this quiz with your partner to find food options that you'll both enjoy! Each person will answer questions about their preferences, and we'll match up the results.</p>
        <button onClick={() => onShow() }>Start Quiz!</button>
      </div>
    </main>
  )
}

export default CouplesMain;