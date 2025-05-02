function CouplesMain({ onShow }) {
  return (
    <main>
      <div className="container">
        <h1>Couple's Quiz</h1>
        <p>You and your partner can't seem to agree on what to eat...again. Our Couple's Quiz is the perfect solution! How does it work? You can take the quiz, just like our original quiz feature. Although in this feature, your partner will take the quiz once you are finished. At the end, you and your partners results will be compared and we will display all the dishes that match up. We'll suggest only the dishes that you BOTH might enjoy based on your combined preferences.</p>
        <button onClick={() => onShow() }>Start Quiz!</button>
      </div>
    </main>
  )
}

export default CouplesMain;