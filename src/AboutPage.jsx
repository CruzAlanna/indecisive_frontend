import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Users, Shuffle, Book, Store } from 'lucide-react';
import './styles/AboutPage.css';

function About() {
  return (
    <div className="about">
      <h1>Welcome to Indecis<span>¿</span>ve!</h1>
      <h3>An application, perfect for those who struggle to make that everyday decision: what to eat</h3>
      
      <div className="message">
        <h4>"What do I feel like eating?"</h4>
        <h4>That incessant question that, for many, is impossible to answer! Hunger is inevitable, and Indecis¿ve is the solution. Our website aims to help users decide what to eat, when they are not craving anything specific.</h4>
      </div>
      
      <nav className="about-nav">
        <h3>There are several options to choose from!</h3>
        
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-card-icon">
              <Utensils size={36} />
            </div>
            <h3>Foods Quiz</h3>
            <p>Answer a few questions about what you're in the mood for and get personalized food suggestions.</p>
            <button>
              <Link to="/quiz" className="about-button">Take Quiz</Link>
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-card-icon">
              <Users size={36} />
            </div>
            <h3>Couples Quiz</h3>
            <p>Find food options that might satisfy both you and your partner's cravings.</p>
            <button>
              <Link to="/partners" className="about-button">Take Couple's Quiz</Link>
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-card-icon">
              <Shuffle size={36} />
            </div>
            <h3>Random Suggestion</h3>
            <p>Get a completely random food suggestion or filter by category.</p>
            <button>
              <Link to="/random" className="about-button">Random Suggestion</Link>
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-card-icon">
              <Book size={36} />
            </div>
            <h3>Food Menu</h3>
            <p>Browse our complete menu of food options with detailed descriptions.</p>
            <button>
              <Link to="/menu" className="about-button">View Menu</Link>
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-card-icon">
              <Store size={36} />
            </div>
            <h3>Restaurants</h3>
            <p>Explore restaurants and view their menu options.</p>
            <button>
              <Link to="/restaurants" className="about-button">View Restaurants</Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default About;