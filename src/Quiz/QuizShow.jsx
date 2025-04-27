function QuizShow({ questions }) {
  return (
    <div className="quiz-box">
      {questions.map((question) => (
        <div key={question.id}>
          <h2>{question.q}</h2>
        </div>
      ))}
    </div>
  )
}

export default QuizShow;