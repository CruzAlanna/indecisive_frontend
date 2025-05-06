import { Link } from 'react-router-dom';

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
        <button><Link to="/quiz" className="about-button">Take Quiz</Link></button>
        <br></br>
        <button><Link to="/menu" className="about-button">View Menu</Link></button>
        <br></br>
        <button><Link to="/restaurants" className="about-button">View Restaurants</Link></button>
        <br></br>
        <button><Link to="/partners" className="about-button">Take Couple's Quiz</Link></button>
        <br></br>
        <button><Link to="/random" className="about-button">Random Suggestion</Link></button>
      </nav>
    </div>
  )
};

export default About;