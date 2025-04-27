function QuizMain({ onShow }) {
  return (
    <main>
      <h1>Decisions Quiz</h1>
      <div className="container">
        <p>This quiz will ask you various questions to get an idea of what flavors you are in the mood for. Based on your answers, this quiz will make suggestions of what kind of foods you might be interested in enjoying!</p>
        <button onClick={() => onShow() }>Start Quiz!</button>
      </div>
    </main>
  )
}

export default QuizMain;