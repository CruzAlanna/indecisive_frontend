function About() {
  return (
    <div className="about">
      <h1>Welcome to Indecis¿ve!</h1>
      <h3>-An application, perfect for those who struggle to make that everyday decision: what to eat-</h3>
      <br></br>
      <div className="message">
        <h4>"What do I feel like eating?</h4>
        <h4>That incessant question that, for many, is impossible to answer! Hunger is inevitable, and Indecis¿ve is the solution. Our website aims to help users on deciding what to eat, when they are not craving anything specific.</h4>
      </div>
      <br></br>
      <nav className="about-nav">
        <h3>There are several options to choose from!</h3>
        <button>Take a Quiz</button>
        <br></br>
        <button>View Menu</button>
        <br></br>
        <button>Couple's Quiz</button>
        <br></br>
        <button>Random Suggestion</button>
      </nav>
    </div>
  )
};

export default About;